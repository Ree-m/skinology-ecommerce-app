
const SearchedProductsPage = (props) => {
  const { results } = props.location?.state ?? {};

  return (
    <div>
      <h1>Search Results</h1>
      {results === [] ? (
        <p>No results matched</p>
      ) : (
        <ul>
          {results?.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchedProductsPage;
