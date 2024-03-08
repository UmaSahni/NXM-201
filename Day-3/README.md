# What is a relationship and why do need ?

- We can create link between collections.
    - Blogs <-----> User
- We can specify the blogs created with specific user

Blogs - {
    title,
    content,
    date,
    author_Name,
    auther_email
}

# Why to create different collections ? Why not keep everything in same collections ?

 - Hetic to manage.
 - Get those data also which is not required.

## "Its a way two or more things are connected to each other."

collections
 - author
 - Blogs

author{
    name, 
    email - unique,
    city
}

Blogs{
    blog_id - unique
    title,
    content,
    image,
    date,
    auther_email
}

# How to build relationship between author and Blogs?

1. Put email in blogs collections ✅
2. Blog_id in author collections ❌

# Check who is indepentent ?
Ask this questions.

1. Can a author exits without blogs ?
2. Can blog exits without author ?

Ans : Author is indepentent (Parent)

# Should we allow anyone to delete any blog ? Or we should only allow author to delete that blog ?

Auth - api/blogs/delete/:blog_id

1. BlogModel
2. AuthorModel

```js
let {blog_id} = req.params
let {auther_email} = req.body
let blog = await BlogModel.find({blog_id})

if(auther_email== blog.auther_email) {
    BlogModel.findByIdAndDelete(blog_id)
    res.send({"msg" : "Blog delted successfully"})
}
else{
    req.status(500).send({staus:false, msg:"You are not authenticated to perform this action"})
}

// <------------ Optimise this ------------>

let {blog_id} = req.params
let {email} = req.body // This from middleware

    await BlogModel.findOneAndDelete(blog_id:blog_id, auther_email:email)
    res.send({"msg" : "Blog delted successfully"})

else{

    req.status(500).send({staus:false, msg:"You are not authenticated to perform this action"})
}
```
----------------------------

**Class Starts Now**

# Lookup operator

Our Moto --> Optimise the at the server level. Make processing as much as possible in the server level.

**$lookup operator**

It helps us with relationship.

{ Mongoose Populate - ref } --> explore

collections
blogs
author

while we are in blog collections we can not accress the author's collections.❌

db.author.find() 

Comprehensive guide to learn to use lookup

create 2 collections
1. users - 2 users
2. posts - 5 posts

#### `nxm_201> db.users.insertOne({name:"Uma Sahni", email:"uma@gmail.com", gender:"female"})`

#### `nxm_201> db.users.insertOne({name:"Ram Bhagawan", email:"ram@gmail.com", gender:"male"})`

#### `nxm_201> db.users.find()`

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
    [
    {
        _id: ObjectId("65e9749e14c45c420b6c57ee"),
        name: 'Uma Sahni',
        email: 'uma@gmail.com',
        gender: 'female'
    },
    {
        _id: ObjectId("65e974b614c45c420b6c57ef"),
        name: 'Ram Bhagawan',
        email: 'ram@gmail.com',
        gender: 'male'
    }
    ]
  </pre>
  
</details>

#### `nxm_201> db.posts.find()`

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
    [
  {
    _id: ObjectId("65e971e814c45c420b6c57e9"),
    title: 'Bhagavat Gita',
    des: 'Listen when you feel low',
    user_email: 'ram@gmail.com'
  },
  {
    _id: ObjectId("65e9720814c45c420b6c57ea"),
    title: 'Ramayana',
    des: 'The greate story of Ram and Sita',
    user_email: 'ram@gmail.com'
  },
  {
    _id: ObjectId("65e9724814c45c420b6c57eb"),
    title: 'Mahabharat',
    des: 'Bharat ki hai kahani sadiyo se bhi purani hai gyan ki ye ganga,Rishiyu ki amar vani.',
    user_email: 'ram@gmail.com'
  },
  {
    _id: ObjectId("65e9727a14c45c420b6c57ec"),
    title: 'Problem solving',
    des: 'Solve leetcode medium level question',
    user_email: 'uma@gmail.com'
  },
  {
    _id: ObjectId("65e972a314c45c420b6c57ed"),
    title: 'Coding Assignment',
    des: 'Made responsive navbar in react.js',
    user_email: 'uma@gmail.com'
  }
]
  
  </pre>
  
</details>

Now this is snytax

db.userCollection.aggregate([{$lookup:{from:"Go and  look to which collection", localField:"What is the comman thing in both collection `key`", foreignField:"In other collection give comman feild `key`", as:"Name to show as array" }}])

## `nxm_201> db.users.aggregate([{$lookup:{from:"posts", localField:"email", foreignField:"user_email", as:"allPosts"}}])`


<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  [
  {
    _id: ObjectId("65e9749e14c45c420b6c57ee"),
    name: 'Uma Sahni',
    email: 'uma@gmail.com',
    gender: 'female',
    allPosts: [
      {
        _id: ObjectId("65e9727a14c45c420b6c57ec"),
        title: 'Problem solving',
        des: 'Solve leetcode medium level question',
        user_email: 'uma@gmail.com'
      },
      {
        _id: ObjectId("65e972a314c45c420b6c57ed"),
        title: 'Coding Assignment',
        des: 'Made responsive navbar in react.js',
        user_email: 'uma@gmail.com'
      }
    ]
  },
  {
    _id: ObjectId("65e974b614c45c420b6c57ef"),
    name: 'Ram Bhagawan',
    email: 'ram@gmail.com',
    gender: 'male',
    allPosts: [
      {
        _id: ObjectId("65e971e814c45c420b6c57e9"),
        title: 'Bhagavat Gita',
        des: 'Listen when you feel low',
        user_email: 'ram@gmail.com'
      },
      {
        _id: ObjectId("65e9720814c45c420b6c57ea"),
        title: 'Ramayana',
        des: 'The greate story of Ram and Sita',
        user_email: 'ram@gmail.com'
      },
      {
        _id: ObjectId("65e9724814c45c420b6c57eb"),
        title: 'Mahabharat',
        des: 'Bharat ki hai kahani sadiyo se bhi purani hai gyan ki ye ganga,Rishiyu ki amar vani.',
        user_email: 'ram@gmail.com'
      }
    ]
  }
]
  </pre>
</details>

----------------------------------------


# $out Aggregation operator

$out is output

stores the output in a collection

$out stage - It will be the end.
$out - write the documents/result into a new collection.

[{},{},{},{},{$out}]

$out : {collectionName}

## `db.users.aggregate([{$lookup:{from:"posts", localField:"email", foreignField:"user_email", as:"allPosts"}}, {$out:"usersandposts"}])`

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  nxm_201> db.usersandposts.find()
[
  {
    _id: ObjectId("65e9749e14c45c420b6c57ee"),
    name: 'Uma Sahni',
    email: 'uma@gmail.com',
    gender: 'female',
    allPosts: [
      {
        _id: ObjectId("65e9727a14c45c420b6c57ec"),
        title: 'Problem solving',
        des: 'Solve leetcode medium level question',
        user_email: 'uma@gmail.com'
      },
      {
        _id: ObjectId("65e972a314c45c420b6c57ed"),
        title: 'Coding Assignment',
        des: 'Made responsive navbar in react.js',
        user_email: 'uma@gmail.com'
      }
    ]
  },
  {
    _id: ObjectId("65e974b614c45c420b6c57ef"),
    name: 'Ram Bhagawan',
    email: 'ram@gmail.com',
    gender: 'male',
    allPosts: [
      {
        _id: ObjectId("65e971e814c45c420b6c57e9"),
        title: 'Bhagavat Gita',
        des: 'Listen when you feel low',
        user_email: 'ram@gmail.com'
      },
      {
        _id: ObjectId("65e9720814c45c420b6c57ea"),
        title: 'Ramayana',
        des: 'The greate story of Ram and Sita',
        user_email: 'ram@gmail.com'
      },
      {
        _id: ObjectId("65e9724814c45c420b6c57eb"),
        title: 'Mahabharat',
        des: 'Bharat ki hai kahani sadiyo se bhi purani hai gyan ki ye ganga,Rishiyu ki amar vani.',
        user_email: 'ram@gmail.com'
      }
    ]
  }
]
  </pre>
</details>

2nd Example

## `nxm_201> db.zips.aggregate([{$group:{_id:"$state", total: {$sum: "$pop"}}}, {$sort:{total:-1}}, {$limit:10},{$out:"top10states"}])`

`nxm_201> show collections`

orders
posts
top10states
users
usersandposts
zips

`nxm_201> db.top10states.find()`

<details>
  <summary>Click to expand/collapse</summary>
  
  <pre>
  [
  { _id: 'CA', total: 29754890 },
  { _id: 'NY', total: 17990402 },
  { _id: 'TX', total: 16984601 },
  { _id: 'FL', total: 12686644 },
  { _id: 'PA', total: 11881643 },
  { _id: 'IL', total: 11427576 },
  { _id: 'OH', total: 10846517 },
  { _id: 'MI', total: 9295297 },
  { _id: 'NJ', total: 7730188 },
  { _id: 'NC', total: 6628637 }
]
  </pre>
</details>

Important

If the schema is different then also it will overwrite. like zips can replace users.

It will be storted in the same db.

$out : {db:"B", coll:"usersandposts"} --> It will work only in new versions.

----------------------------------------------

# $project operator
- It can be used any-ware. you can have $group, $sort, $limit and any time you can use project.
### `nxm_201> db.users.aggregate([{$project:{name:1}}])`

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  [
  { _id: ObjectId("65e9749e14c45c420b6c57ee"), name: 'Uma Sahni' },
  { _id: ObjectId("65e974b614c45c420b6c57ef"), name: 'Ram Bhagawan' }
]
  </pre>
</details>

--------------------------------------

# $count

- Count the number of documents.

## `nxm_201> db.zips.aggregate([{$count:"Name of count "}])`

-------------------------------------

# $set 

`nxm_201> db.orders.aggregate([{$match:{name:"Vegan"}},{$set:{offer:"10%"}}])`

<details>
  <summary>Click to expand/collapse</summary>
  <pre> 
  [
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z"),
    offer: '10%'
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z"),
    offer: '10%'
  }
]
  </pre>
</details>

<details>
  <summary>Click to expand/collapse</summary>
 <pre>
 [
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z"),
    affordable: true
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z"),
    affordable: true
  },
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z"),
    affordable: true
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z"),
    affordable: true
  },
  {
    _id: 4,
    name: 'Cheese',
    size: 'medium',
    price: 13,
    quantity: 50,
    date: ISODate("2022-01-12T21:23:13.331Z"),
    affordable: true
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z"),
    affordable: true
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z"),
    affordable: true
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z"),
    affordable: true
  }
]
 </pre>
</details>

---------------------------------

$match
$group
$limit
$sort
$lookup
$set
$out
$project
$count
$skip


$sum
$avg
$multiply
