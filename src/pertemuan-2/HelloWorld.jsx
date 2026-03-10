export default function HelloWorld() {
      const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }
  return (
    <div className="card">
      <h1>Hello World</h1>
      <p>Selamat Belajar ReactJs</p>
      <GreetingBinjai />
      <QuoteText />
      <UserCard
        nama="Amel"
        nim="123456789"
        tanggal="2026/06/01"/>    
        <UserCard {...propsUserCard} /> 
    </div>
  );
}

function GreetingBinjai() {
  return <small className="card"> Salam dari Binjai 🙌 </small>;
}

function QuoteText() {
  const text = "Mulutmu Harimaumu";
  const text2 = "Aku ingin jadi macan";
  return (
    <div className="card">
      <hr />
      <p>{text.toLowerCase()}</p>
      <p>{text2.toUpperCase()}</p>
    </div>
  );
}

function UserCard(props) {
  return (
    <div className ="card">
      <hr />
      <h3>Nama: {props.nama}</h3>
      <p>NIM: {props.nim}</p>
      <p>Tanggal: {props.tanggal}</p>
    </div>
  );
}
