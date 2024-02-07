const Products = ({products}) => {

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 mt-28">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={product.image}
              alt={product.title}
              width={50}
              height={50}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-600 font-semibold">
                {product.price}
              </span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
