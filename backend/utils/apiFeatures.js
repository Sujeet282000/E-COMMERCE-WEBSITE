const { json } = require("express");

class ApiFeatures {

  //constructor he
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;    //parameters pass kiye hue isme aayge 
  }



  // ----------------------// Search feature
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




  // -----------------------//filter feature for category

  filter() {


    //------111query.str ko use karke modify karna he to sabse pehle iski copy baba lete he taki main wali query.str me kuch na ho //  const copiedKeyword = { ...originalKeyword };  //spread operator
    const queryCopy = { ...this.queryStr }
    // console.log("Before removing fields", queryCopy);

    //Removing some fields for Category
    const removeFields = ["keyword", "page", "limit"];

    //iterate the removefields using forEach loop
    removeFields.forEach((key) => { delete queryCopy[key] });

    //111 console.log("After removing fields", queryCopy);



    //2222--------------------------------- Filter For Price and Rating
    console.log(queryCopy);
    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=>`$${key}`);
    this.query = this.query.find(JSON.parse(querystr));

    //222 console.log(querystr);

    //111 this.query = this.query.find(queryCopy);

    return this;



  }
  





}

module.exports = ApiFeatures;













/*
// ------------search(0)  and filter how it works 
Explanation:

The ApiFeatures class is designed to provide features like search and filter for a query. It takes an initial query (Product.find()) and the request query parameters (req.query) as input.
The search method of the ApiFeatures class constructs a regex pattern for a case-insensitive search based on the keyword parameter in the request query. It then updates the this.query property with the modified query.
The filter method of the ApiFeatures class is used to filter the query based on certain conditions. It creates a copy of the original query string (queryCopy) and removes specified fields ("keyword", "page", "limit") from it. Then, it updates the this.query property with the modified query.
In the getAllProducts function, an instance of the ApiFeatures class is created, and the search and filter methods are applied to modify the query. The modified query is then used to retrieve products from the database, and the result is sent as a JSON response.



*/


/*// -------------------search()
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