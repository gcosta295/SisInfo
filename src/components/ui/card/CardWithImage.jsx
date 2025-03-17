export default function CardWithImage({item}){
    return (
        <div className="rounded-xl grid grid-flow-col grid-cols-3 grid-rows-3 max-w-80 overflow-clip md:h-96 h-80 md:w-80 w-64" style={
            {
            backgroundImage: `url(${item.imagen})`
                    }
        }>
            <div className="text-white text-base mt-auto col-start-1 col-end-4 row-start-1 row-end-4 p-6 z-10">
                <p>{item.fecha}</p>
                <p className="md:text-3xl text-xl font-semibold">{item.titulo}</p>
                <p>{item.descripcion}</p>
            </div>
            <div className="bg-black opacity-30 col-start-1 col-end-4 row-start-1 row-end-4 w-full h-full z-0"></div>
        </div>
    )
}