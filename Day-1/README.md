<pre>
db.heros.insertMany([
  {
    "name": "IronMan",
    "powers": ["robot", "money"],
    "health": 33,
    "villains": [
      { "name": "Mandarin", "health": 50 },
      { "name": "Titanium Man", "health": 54 }
    ],
    "metadata": { "favouriteColor": "red", "age": 13 }
  },
  {
    "name": "Batman",
    "powers": ["intelligence", "money"],
    "health": 40,
    "villains": [
      { "name": "TwoFace", "health": 20 },
      { "name": "Redhood", "health": 65 }
    ],
    "metadata": { "favouriteColor": "blue", "age": 44 }
  },
  {
    "name": "Spider-Man",
    "powers": ["intelligence"],
    "health": 60,
    "villains": [
      { "name": "Venom", "health": 65 },
      { "name": "Dr. Octavio", "health": 76 }
    ],
    "metadata": { "favouriteColor": "red", "age": 44 }
  },
  {
    "name": "Thor",
    "powers": ["god", "magic"],
    "health": 57,
    "villains": [
      { "name": "Surtur", "health": 50 },
      { "name": "Hela", "health": 87 }
    ],
    "metadata": { "favouriteColor": "yello", "age": 313 }
  },
  {
    "name": "Dr. Strange",
    "powers": ["magic"],
    "health": 86,
    "villains": [
      { "name": "Hela", "health": 87 },
      { "name": "Dormamu", "health": 100 }
    ],
    "metadata": { "favouriteColor": "orange", "age": 44 }
  }
])
</pre>
Documment looks like 
{
  key : value
}

1. Find a hero who's health is 40

Ans :  db.heros.find({"health":40})
{
  key : String/Number
}

2. Find a hero who's favouriteColor is red and age is 44

Ans : db.heros.find({"metadata":{favouriteColor:"red", age:44}})

{
  key : {object}
}

3. Find a hero who's age is 44  and  favouriteColor is red

💡When We have object inside object the order matters.
❌ db.heros.find({"metadata":{"age":44, "favouriteColor" : "red"}}) 


4. 3. Find a hero who's favouriteColor is red
💡 Exact order Matters
❌ db.heros.find({"metadata":{favouriteColor:"red"}})
💡 When Using( . )notation it should be in quotes ("").

Ans : db.heros.find({"metadata.favouriteColor" : "red"})

5. Find all the heros who's age is less than 50

Ans :  db.heros.find({"metadata.age":{$lt:50}})

6. All heros who's favouriteColor in summer is red

db.heros.find({"metadata.favouriteColor.summer":"yellow"})


"powers": ["intelligence", "money"],
7. Find all heros who's powers are intelligence and money

Ans : db.heros.find({"powers":["intelligence", "money"]})

💡Orders does matters
❌ db.heros.find({"powers":[ "money","intelligence"]})

8. Find the hero who's power is intelligence

❌ db.heros.find({"power":["intelligence"]}) ---> Spelling mistake in powers

Ans : db.heros.find({"powers":["intelligence"]})
💡When the value is array this works.
But when it was objects it does not work.


When the value is a array of 1 String

it assumes same as 
powers : ["intelligence"]  ===> powers : intelligence

powers : "intelligence" ====> powers : ["money", "xyz", "intelligence"]

Ans : ✅  db.heros.find({"powers":"intelligence"}) as same as db.heros.find({"powers":["intelligence"]})

9. Find all hero's who's power is intelligence and money, irrespective og there order.
🚩🚩🚩 $all operator. All the values should be present.

db.heros.find({"Powers" : {$all :["money", "intelligence"]}})

db.heros.find({"Powers" : {$all :["robot", "intelligence"]}})

10. Find all hero's who's power is any one of this intelligence and robot, irrespective og there order.

🚩🚩🚩 $in operator --> In the array any one value should be present.


db.heros.find({"Powers" : {$in :["robot", "intelligence"]}})

$in vs $all

- Order does not matter

"villains": [
      { "name": "Surtur", "health": 50 },
      { "name": "Hela", "health": 87 }
    ],

11. Find all heros who have a villain of name Hela


--> 😵‍💫   This will work
db.heros.find({"villains":{"name":"Hela","health":87}})

In array order does not matter. But in object order matters.
For first thing it was an array.So it worked.
But if you remove the health:87 it will not work.

villains :{name:"Hela", health:87} --> This will give right answer

villains.name : "Hela"

✅ db.heros.find({"villains.name":"Hela"})


Projection

Projector --> It projects something

Find all the heros whoes health is less than 50

db.heros.find({"health": {$lt : 50}},{name:1,health:1})

1 --> on
0 --> off
