class ApiFeatures {

  //constructor he
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // -----// Search feature
  search() {
    //// Extract the keyword from the query string, and create a regex pattern for a case-insensitive search or for a keyword search
    //  console.log(this.queryStr.keyword);
    const keyword = this.queryStr.keyword ? {
      name: {
        $regex: this.queryStr.keyword,
        $options: "i",
      },
    }
      : {};

    console.log(keyword);

    // Update the 'this.query' property using the 'find' method with the constructed keyword object
    // find wali query chamge kardi
    this.query = this.query.find({ ...keyword });

    // Return the current instance of the class (usually for method chaining) // same class return kardi
    return this;
  }

}

module.exports = ApiFeatures;





















/*
////////////------samajne ke liye
{
  // 'get all products' code snippet

  // ApiFeatures class ka instance banaya jata hai
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search();

  // Products ko retrieve karne ke liye modified query ka use kiya jata hai
  const products = await Product.query;
}

// ApiFeatures class definition
search() {
  // Keyword search ke liye regex pattern banaaya jata hai
  const keyword = this.queryStr.keyword ? {
    name: {
      $regex: this.queryStr.keyword,
      $options: "i",
    },
  } : {};

  // Keyword search wale query ko console par print kiya jata hai
  console.log(keyword);

  // Query ko modify karke, keyword search ke according filter lagaya jata hai
  this.query = this.query.find({ ...keyword });

  // Modified query ke sath apne aap ko return kiya jata hai
  return this;
}
*/