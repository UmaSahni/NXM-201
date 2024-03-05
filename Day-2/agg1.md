Aggregations

Aggregate : To collect something together, to accumulate.

1. Find something from the db, Then you process (filtering, sorting, etc) on the server side/application side

2. Do this thing with db. (Better way)

Aggregation 
    very powerful
    Aggregation operator


pipeline : something flows from one end to other end.
  - consists of stages
  -  The input for each stages, depends on the - - ouput of the previous stage.
 
<a href="https://ibb.co/s9kWR30"><img src="https://i.ibb.co/23mZhKD/image.png" alt="image" border="0" /></a>

**Input of the 2nd Stage depends on the output of the previous stage.**

https://miro.medium.com/v2/resize:fit:665/1*5ZlDfUiM_uHPW6KwvszS_g.png

   

Syntax
db.orders.find({price : 500})
db.orders.aggregate([{}, {},{}])

1. This array --> [] pipeline
2. Inside {},{},{} --> Stage

**the nth stage works on the output of the n-1th stage.**

[Aggregation Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

`nxm_201> db.orders.aggregate([{}])`

MongoServerError: A pipeline stage specification object must contain exactly one field.

But If we don't add any stage we will get all data.

nxm_201> db.orders.aggregate([])

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z")
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z")
  },
  {
    _id: 4,
    name: 'Cheese',
    size: 'medium',
    price: 13,
    quantity: 50,
    date: ISODate("2022-01-12T21:23:13.331Z")
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  }
]

</details>




Operator 
   Starts with $
   learning curve - its diffrent from what we have lernt so for.

   {$limit : 5}

1. $limit
db.orders.aggregate([{$limit:3}, {$limit:1}])

`nxm_201> db.orders.aggregate([{$limit:2}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  }
]

</details>

`nxm_201> db.orders.aggregate([{$limit:3},{$limit:1}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  }
]

</details>

`nxm_201> db.orders.aggregate([{$limit:0},{$limit:2}])`

❌ MongoServerError: the limit must be positive



2. $sort
db.orders.aggregate([{$sort:{"quantity":-1}}])

`db.orders.aggregate([{$sort:{price:-1}}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z")
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  },
  {
    _id: 4,
    name: 'Cheese',
    size: 'medium',
    price: 13,
    quantity: 50,
    date: ISODate("2022-01-12T21:23:13.331Z")
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z")
  }
]

</details>


`db.orders.aggregate([{$sort:{price:-1}},{$limit:2}])`
<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z")
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  }
]

</details>

`db.orders.aggregate([{$limit:2},{$sort:{price:-1}}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  }
]

</details>

`nxm_201> db.orders.aggregate([{$sort:{quantity:-1}}])`
<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 4,
    name: 'Cheese',
    size: 'medium',
    price: 13,
    quantity: 50,
    date: ISODate("2022-01-12T21:23:13.331Z")
  },
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z")
  },
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z")
  },
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  }
]

</details>

`nxm_201> db.orders.aggregate([{$sort:{quantity:-1}},{$skip:2}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z")
  },
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  }
]

</details>


` db.orders.aggregate([{$skip:4},{$sort:{_id:-1}},{$limit:3}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  }
]

</details>

## 5. $Match
   

`db.orders.find({size:"small"})`
<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 3,
    name: 'Cheese',
    size: 'small',
    price: 12,
    quantity: 15,
    date: ISODate("2021-03-13T11:21:39.736Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  }
]

</details>

` db.orders.aggregate([{$match:{size:"medium"}}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 1,
    name: 'Pepperoni',
    size: 'medium',
    price: 20,
    quantity: 20,
    date: ISODate("2021-03-13T09:13:24.000Z")
  },
  {
    _id: 4,
    name: 'Cheese',
    size: 'medium',
    price: 13,
    quantity: 50,
    date: ISODate("2022-01-12T21:23:13.331Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  }
]

</details>

`nxm_201> db.orders.aggregate([{$match:{name:"Vegan"}}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  },
  {
    _id: 7,
    name: 'Vegan',
    size: 'medium',
    price: 18,
    quantity: 10,
    date: ISODate("2021-01-13T05:10:13.000Z")
  }
]

</details>

### Find all large size pizzas in increasing order of there prize.

`nxm_201> db.orders.aggregate([{$match:{size:"large"}}, {$sort:{price:1}}])`

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 5,
    name: 'Cheese',
    size: 'large',
    price: 14,
    quantity: 10,
    date: ISODate("2022-01-12T05:08:13.000Z")
  },
  {
    _id: 2,
    name: 'Pepperoni',
    size: 'large',
    price: 21,
    quantity: 30,
    date: ISODate("2021-03-17T09:22:12.000Z")
  }
]
</details>

## Find all the small size pizzas with price >= 16

Ans : 2 Ways

`nxm_201> db.orders.aggregate([{$match:{size:"small", price: {$gte: 16}}}])` (Better Way)

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  }
][
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  }
]

</details>


` db.orders.aggregate([{$match:{size:"small"}},{$match:{price:{$gte:16}}}])`


<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  },
  {
    _id: 6,
    name: 'Vegan',
    size: 'small',
    price: 17,
    quantity: 10,
    date: ISODate("2021-01-13T05:08:13.000Z")
  }
]

</details>

### Find the smallest pizza with the highest in the price.

` db.orders.aggregate([{$match:{size:"small"}},{$sort:{price:-1}},{$limit:1}])` (My Way) ✅

<details>
<summary>Click to expand/collapse</summary>

[
  {
    _id: 0,
    name: 'Pepperoni',
    size: 'small',
    price: 19,
    quantity: 10,
    date: ISODate("2021-03-13T08:14:30.000Z")
  }
]

<!-- Basic Parts End Here -->


