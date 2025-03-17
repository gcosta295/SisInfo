export default function TarjetaInfo( { item, invertida }) {
    return (
      <div className={`bg-gray-100 w-fit md:w-2xl lg:w-fit h-fit shadow rounded-2xl overflow-clip flex md:flex-row${invertida ? '-reverse' : ''} flex-col items-center`}>
          <img src={item.imagen} className="md:w-64 w-fit h-fit object-cover align-middle px-2 justify-end" alt={item.titulo}/>
          <div className="flex flex-col gap-4 md:gap-8 p-8 md:p-6 lg:p-2 md:w-1/2 w-full">
              <h1 className="semibold text-2xl">{item.titulo}</h1>
              <div className="flex flex-col gap-4 text-sm lg:px-1 lg:w-lg">
                  {item.descripcion.map((linea, i) => (
                    <p key={i}>{linea}</p>
                  ))}
              </div>
          </div>
      </div>
    );
  }