export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="pageheader-title" className="text-3xl font-semibold">
                    {title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2 text-gray-500">
                    {/* Render breadcrumb dari props */}
                    {Array.isArray(breadcrumb) 
                        ? breadcrumb.map((item, index) => (
                            <span key={index}>
                                {item} {index !== breadcrumb.length - 1 && <span className="mx-1">/</span>}
                            </span>
                          ))
                        : <span>{breadcrumb}</span>
                    }
                </div>
            </div>
            <div id="action-button ">
                {/* children akan menampilkan tombol dinamis (Add Customer/Add Order) */}
                {children}
            </div>
        </div>
    );
}