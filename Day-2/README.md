# Aggregations

**Aggregate : To collect something together, to accumulate.**

1. Find something from the db, Then you process (filtering, sorting, etc) on the server side/application side

2. Do this thing with db. (Better way)

**Aggregation** 
   - very powerful
   - Aggregation operator


**pipeline** : something flows from one end to other end.
  - consists of stages
  -  The input for each stages, depends on the - - ouput of the previous stage.
 
<a href="https://ibb.co/s9kWR30"><img src="https://i.ibb.co/23mZhKD/image.png" alt="image" border="0" /></a>

**Input of the 2nd Stage depends on the output of the previous stage.**
<a href="https://ibb.co/s9kWR30"><img src="https://miro.medium.com/v2/resize:fit:665/1*5ZlDfUiM_uHPW6KwvszS_g.png" alt="image" border="0" /></a>

-------------------------------

# Pratical Use

**Syntax**

db.orders.find({price : 500})

db.orders.aggregate([{}, {},{}])

1. This array --> [] pipeline
2. Inside {},{},{} --> Stage

**the nth stage works on the output of the n-1th stage.**

[Aggregation Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/)

`nxm_201> db.orders.aggregate([{}])`
❌MongoServerError: A pipeline stage specification object must contain exactly one field.

**But If we don't add any stage we will get all data.**

## 1. `nxm_201> db.orders.aggregate([])`

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
</pre>
</details>



**Operator** 
   - Starts with $
   - learning curve - its diffrent from what we have lernt so for.

   `{$limit : 5}`

# 1. $limit
db.orders.aggregate([{$limit:3}, {$limit:1}])

## 1. `nxm_201> db.orders.aggregate([{$limit:2}])`

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
</pre>
</details>



## 2.`nxm_201> db.orders.aggregate([{$limit:3},{$limit:1}])`

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
    date: ISODate("2021-03-13T08:14:30.000Z")
  }
]
</pre>
</details>



## 3.`nxm_201> db.orders.aggregate([{$limit:0},{$limit:2}])`

❌ MongoServerError: the limit must be positive


# 2. $sort
db.orders.aggregate([{$sort:{"quantity":-1}}])

## 1.`db.orders.aggregate([{$sort:{price:-1}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



## 2.`db.orders.aggregate([{$sort:{price:-1}},{$limit:2}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



## 3.`db.orders.aggregate([{$limit:2},{$sort:{price:-1}}])`

<details>
<summary>Click to expand/collapse</summary>
</pre>
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
</pre>
</details>



## 4.`nxm_201> db.orders.aggregate([{$sort:{quantity:-1}}])`


<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



# 3.Skip

## 1. `nxm_201> db.orders.aggregate([{$sort:{quantity:-1}},{$skip:2}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



## 2.`db.orders.aggregate([{$skip:4},{$sort:{_id:-1}},{$limit:3}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



# 5. $Match
   
## 1.`db.orders.find({size:"small"})`

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
</pre>
</details>



## 2.`db.orders.aggregate([{$match:{size:"medium"}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



## 3.`nxm_201> db.orders.aggregate([{$match:{name:"Vegan"}}])`

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
</pre>
</details>



## Find all large size pizzas in increasing order of there prize.

`nxm_201> db.orders.aggregate([{$match:{size:"large"}}, {$sort:{price:1}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
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
</pre>
</details>



## Find all the small size pizzas with price >= 16

Ans : 2 Ways

`nxm_201> db.orders.aggregate([{$match:{size:"small", price: {$gte: 16}}}])` (Better Way)

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
</pre>
</details>


`db.orders.aggregate([{$match:{size:"small"}},{$match:{price:{$gte:16}}}])`


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
</pre>
</details>

### Find the smallest pizza with the highest in the price.

` db.orders.aggregate([{$match:{size:"small"}},{$sort:{price:-1}},{$limit:1}])` (My Way) ✅

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
    date: ISODate("2021-03-13T08:14:30.000Z")
  }
]
</pre>
</details>

<!-- Basic Parts End Here -->
----------------------------------

# $group

10,000 masai students.

Time of course - FT, PT 
Type of course - MERN, NODE, Java
state - Maharashtra

We group it by something, like batch, course, course_time.

So we need to give _id mandatorily.

## 1. `db.orders.aggregate([{$group:{_id:"$size"}}])`

<details>
<summary>Click to expand/collapse</summary>

<pre> 
[ { _id: 'large' },
  { _id: 'small' }, 
  { _id: 'medium' } 
]
</pre>

</details>

## 2. `db.orders.aggregate([{$group:{_id:"$name"}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
[ { _id: 'Cheese' }, { _id: 'Vegan' }, { _id: 'Pepperoni' } ]
</pre>
</details>

## Do it Normally 

### Find the total number of small size pizzas.

Ans : 35

`db.orders.find({size:"small"}).count()`
<details> (My Way ❌ )

Ans : 3

```js
let total_small = await ordersModel.find({size:"small"})

let totalPizzas = 0

for (let el of total_small){
  el.quantity += totalPizzas
}

res.send({totalPizzas})

```
-----------------------------------

# Power of Aggregation

## Instead of all This

`nxm_201> db.orders.aggregate([{$group:{_id:"$size", totalQty: {$sum: "$quantity"}}}])`

<summary>Click to expand/collapse</summary>
<pre>
[
  { _id: 'large', totalQty: 40 },
  { _id: 'small', totalQty: 35 },
  { _id: 'medium', totalQty: 80 }
]
</pre>
</details>

## Q.2 Find the total number of vegan size pizzas
(Better way ✅)
` db.orders.aggregate([{$match:{name:"Vegan"}},{$group:{_id:"$name", totalQty: {$sum : "$quantity"}}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
[ { _id: 'Vegan', totalQty: 20 } ]
</pre>
</details>

**Another way to do same thing**

`db.orders.aggregate([{$group:{_id:"$name", totalQty: {$sum : "$quantity"}}},{$match:{name:"Vegan"}}])`

<details>
<summary>Click to expand/collapse</summary>
<pre>
[ { _id: 'Vegan', totalQty: 20 } ]
</pre>
</details>

## Q.3 Find the total cost of small size pizzas.

### Find the state which has the largest population

`db.zips.aggregate([{$group:{_id:"$state", total: {$sum: "$pop"}}}, {$sort:{total:-1}}, {$limit:1}])`
<details>
<summary>Click to expand/collapse</summary>
<pre>
[ { _id: 'CA', total: 29754890 } ]
</pre>
</details>


