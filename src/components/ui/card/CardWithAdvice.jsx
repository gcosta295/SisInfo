export default function CardWithAdvice({item}){
    return (
        <div className="bg-white rounded-xl grid grid-flow-col grid-cols-3 grid-rows-3 max-w-80 overflow-clip md:h-96 h-80 md:w-80 w-64">
            <div className="text-gray-700 text-base mt-auto col-start-1 col-end-4 row-start-1 row-end-4 p-6 z-10">
                <p className="md:text-3xl text-xl font-bold mb-10">{item.titulo}</p>
                <p>{item.descripcion1}</p>
                <p>{item.descripcion2}</p>
            </div>
        </div>
    )
}