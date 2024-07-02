exports.getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  
  exports.getFiltering = ({ category, priceRange }) => {
    let filterOptions = {};
  
    if (category) {
      filterOptions.category = category;
    }
  
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      filterOptions.price = { [Op.between]: [min, max] };
    }
  
    return filterOptions;
  };
  