export default function ItemContacto({ item }){
    return (
        <div className="p-4">
            <div className="flex gap-2 items-center text-2xl font-semibold">
                {item.icono}
                <p>{item.titulo}</p>
            </div>
            <p>
                {item.descripcion}
            </p>
        </div>
    )
}