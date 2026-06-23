create extension if not exists pgcrypto;

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text,
    role text not null default 'member' check (role in ('admin', 'member')),
    total_points integer not null default 0,
    tier text not null default 'Bronze' check (tier in ('Bronze', 'Silver', 'Gold', 'Platinum')),
    created_at timestamp with time zone not null default now()
);

create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric not null default 0,
    stock integer not null default 0,
    created_at timestamp with time zone not null default now()
);

create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    member_id uuid not null references public.profiles(id) on delete cascade,
    total_original_price numeric not null default 0,
    discount_applied numeric not null default 0,
    total_final_price numeric not null default 0,
    points_earned integer not null default 0,
    status text not null default 'pending',
    created_at timestamp with time zone not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.profiles
        where id = auth.uid()
        and role = 'admin'
    );
$$;

create or replace function public.get_tier(points integer)
returns text
language sql
immutable
as $$
    select case
        when points > 1000 then 'Platinum'
        when points >= 501 then 'Gold'
        when points >= 101 then 'Silver'
        else 'Bronze'
    end;
$$;

create or replace function public.get_discount_by_tier(member_tier text)
returns numeric
language sql
immutable
as $$
    select case member_tier
        when 'Platinum' then 0.20
        when 'Gold' then 0.15
        when 'Silver' then 0.10
        else 0.05
    end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    insert into public.profiles (id, full_name, role)
    values (
        new.id,
        coalesce(new.raw_user_meta_data->>'full_name', new.email),
        'member'
    );

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

create or replace function public.create_member_order(product_id uuid, quantity integer)
returns public.orders
language plpgsql
security definer
set search_path = public
as $$
declare
    current_profile public.profiles;
    selected_product public.products;
    original_price numeric;
    discount_rate numeric;
    discount_value numeric;
    final_price numeric;
    earned_points integer;
    created_order public.orders;
begin
    if auth.uid() is null then
        raise exception 'User must be authenticated';
    end if;

    if quantity is null or quantity <= 0 then
        raise exception 'Quantity must be greater than zero';
    end if;

    select * into current_profile
    from public.profiles
    where id = auth.uid();

    if current_profile.role <> 'member' then
        raise exception 'Only member can create order';
    end if;

    select * into selected_product
    from public.products
    where id = product_id
    for update;

    if selected_product.id is null then
        raise exception 'Product not found';
    end if;

    if selected_product.stock < quantity then
        raise exception 'Product stock is not enough';
    end if;

    original_price := selected_product.price * quantity;
    discount_rate := public.get_discount_by_tier(current_profile.tier);
    discount_value := original_price * discount_rate;
    final_price := original_price - discount_value;
    earned_points := floor(final_price / 10000);

    update public.products
    set stock = stock - quantity
    where id = product_id;

    insert into public.orders (
        member_id,
        total_original_price,
        discount_applied,
        total_final_price,
        points_earned,
        status
    )
    values (
        auth.uid(),
        original_price,
        discount_value,
        final_price,
        earned_points,
        'pending'
    )
    returning * into created_order;

    update public.profiles
    set
        total_points = total_points + earned_points,
        tier = public.get_tier(total_points + earned_points)
    where id = auth.uid();

    return created_order;
end;
$$;

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (auth.uid() = id or public.is_admin());

drop policy if exists "profiles_update_admin" on public.profiles;
create policy "profiles_update_admin"
on public.profiles for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "products_select_authenticated" on public.products;
create policy "products_select_authenticated"
on public.products for select
to authenticated
using (true);

drop policy if exists "products_all_admin" on public.products;
create policy "products_all_admin"
on public.products for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "orders_select_own_or_admin" on public.orders;
create policy "orders_select_own_or_admin"
on public.orders for select
to authenticated
using (auth.uid() = member_id or public.is_admin());

drop policy if exists "orders_insert_member" on public.orders;
create policy "orders_insert_member"
on public.orders for insert
to authenticated
with check (
    auth.uid() = member_id
    and exists (
        select 1
        from public.profiles
        where id = auth.uid()
        and role = 'member'
    )
);

drop policy if exists "orders_update_admin" on public.orders;
create policy "orders_update_admin"
on public.orders for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "orders_delete_admin" on public.orders;
create policy "orders_delete_admin"
on public.orders for delete
to authenticated
using (public.is_admin());
