# Database Optimisation

## What is a database ?

Ans - A dedicated softwere which helps us to perform CURD operations in very optimal way.

Optimisation means make it better.
"" If you are gaining something then you are loosing something.

What all factors affects the performance of Database ?

Some of this will be in our control.
 1. Amount of data 
    2. CPU / Processor
    3. Storage 
        - Ram/Memory
        - Disk - Hard Disk (HDD) / SSD
    4. Network
        - Location (Mumbai ✅ (If we are accessing from India) / California)
        - Bandwidth - 2GB 1Mbps, 100 Mbps
    5. Query
        - Order of stages
    zips - cors i2 , 4gb
   
 [{},{},{},{}] -- > each stages data is stored in Ram (virtual storage).

💰 Exprensive 

- RAM > SSD > HHD
 - Ram - 20 to 25x faster than SSD

# Find all the users in the ascending of their age, who's age is less than 20 and who are from Mumbai(city)

 - 50,000 data
 - Of all ages - 1, 64, 70,74
 - Of all cities - mumbai, bangalore, delhi, kolkata

Ans :   db.users.aggregate([{$match : {city:"Mumbai"}},{$match: {age:{$lt:20}}},{$sort:{age:1}}])

db.users.aggregate([{$sort : {age:1}}, {$match : {age:{$lt:20}}}, {$match:{city:"Mumbai"}}])

--------------------------
# Sharding

<a href="https://imgbb.com/"><img src="https://i.ibb.co/wBvbckX/image.png" alt="image" border="0" /></a> 

10GB Storage -->
    10 GB Filled

Sharding - Entire DB splits into small small DB'small

If you want to upgrade.
10GB Storage
10GB Storage
10GB Storage
10GB Storage

# Scaling System.

1. Horinzontal Scaling - split into many computer systems. (server) into small dbs.

2. Vertical Scaling - In the same System increaing the storage.
[16GB + 16GB] = 38GB

# Query Optimisation
    Indexing in MongoDB (heps us to perform query fatser)
    
Indexing in general : Refrenece (helps with finding faster)

100 users
masai_id :1
masai_id :2 
masai_id :3
masai_id :95
.......
........
masai_id :100

db.users.find({masai_id:95}) 
Time Complexity will be O(N)
Traversal is call as scaning in MongoDB.

## Collscan -- Collection scan

## Compare with this Now!

_id :1
_id :2 
_id :3
_id :95
.......
........
_id :100

db.users.find({_id:99}) 

Time Complexity = O(1)

You may have disscused in Mongo Intro class
_id is indexed by default.

<a href="https://ibb.co/NtCShnj"><img src="https://i.ibb.co/6rwBhJP/image.png" alt="image" border="0"></a>

<a href="https://ibb.co/NtpmVC5"><img src="https://i.ibb.co/MZpG2Sr/image.png" alt="image" border="0"></a>

<a href="https://ibb.co/yNn3tGh"><img src="https://i.ibb.co/L0zGmbQ/image.png" alt="image" border="0"></a>

<a href="https://ibb.co/tct7Zhf"><img src="https://i.ibb.co/K7kMNGZ/image.png" alt="image" border="0"></a>

**Any query with _id will be O(1)**

Not all query will be possible with index.

We can also create indexes.

<a href="https://ibb.co/0XWjHjk"><img src="https://i.ibb.co/thNMVMS/image.png" alt="image" border="0"></a>

<a href="https://ibb.co/9HQzKGp"><img src="https://i.ibb.co/r2DT8vQ/image.png" alt="image" border="0"></a>

In this Index Scan Happens -- Ixs

Indexing - makes query super fast -> O(n) to O(1)

Readquery faster

# Should we index all the keys ?

Ans : Do we index all the words in the book ? Now what happens if we index all the all the words. It becomes messy. Index will become book.

keys are indexed

then ixscan <----> Collscan O(N)
No Optimisation happening.

# Which key should be indexed ?
Ans : One factor unique.
Something we use frequenty.
<pre>

{
    id: Object("jjfsfs),
    name:"Sumit Kumar",
    course: "NXM201",
    city:Pune,
    pan_number:123456789,
    student_code:"fw22_1061", ✅ 
    ....
    ....
    ....
    ....
    ....
}
</pre>

Another example
<pre>
{
    _id : ObjectID("nnjkkds"),
    city,
    age,
    aadhar_no, ✅
    pan_no,
    blood_group,
    state,
    mobile_no, ✅
    ......
    ......
    ......
    ......
}
</pre>
db.collection_name.createIndex()

``db.zips.createIndex({"pop":1})`

## Disadvantages of Indexing
- Write/create/Insert query will be slower
- Extra space.
- Suppose we have 2 collections.
- Indexing - B+trees (You need to balance)

    users - health - indexed; This will be slow WHY ?

  57 - kksnnfsnkgsg{}

    user - no index;

    Think of book example.
    Book1 - armstrong - index

 1.   Suppose you need to add 4 pages, in 2nd page -- "armstrong"

   So will you only add pages or do you need to modify something.
    Go and change the index.

 2.    Assume there is 1 more book.
    So here there are no index.
    You will insert 4 pages and go on.


<a href="https://ibb.co/mJM3w6N"><img src="https://i.ibb.co/y0br1W4/image.png" alt="image" border="0"></a>

Collscan
IXscan 
Explain ->
    db.users.explain()

### ``nxm_201> db.heros.find({name:"Batman"}).explain("executionStats")``

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'nxm_201.heros',
    indexFilterSet: false,
    parsedQuery: { name: { '$eq': 'Batman' } },
    queryHash: '64908032',
    planCacheKey: '64908032',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    winningPlan: {
      stage: 'COLLSCAN',
      filter: { name: { '$eq': 'Batman' } },
      direction: 'forward'
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 0,
    totalKeysExamined: 0, ↙️
    totalDocsExamined: 5, ↙️
    executionStages: {
      stage: 'COLLSCAN',
      filter: { name: { '$eq': 'Batman' } },
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 7,
      advanced: 1,
      needTime: 5,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      direction: 'forward',
      docsExamined: 5
    }
  },
  command: { find: 'heros', filter: { name: 'Batman' }, '$db': 'nxm_201' },
  serverInfo: {
    host: 'LAPTOP-PBPNJUMQ',
    port: 27017,
    version: '6.0.5',
    gitVersion: 'c9a99c120371d4d4c52cbb15dac34a36ce8d3b1d'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,       
    internalQueryFacetMaxOutputDocSizeBytes: 104857600, 
    internalLookupStageIntermediateDocumentMaxSizeBytes:
 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,      
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes:
 104857600
  },
  ok: 1
}
  </pre>
</details>

### nxm_201> db.orders.find({name:"Vegan"}).explain("executionStats")

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'nxm_201.orders',
    indexFilterSet: false,
    parsedQuery: { name: { '$eq': 'Vegan' } },
    queryHash: '64908032',
    planCacheKey: 'A6C0273F',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
    winningPlan: {
      stage: 'FETCH',
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { name: 1 },
        indexName: 'name_1',
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Vegan", "Vegan"]' ] } 
      }
    },
    rejectedPlans: []
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 2,
    executionTimeMillis: 12,
    totalKeysExamined: 2,
    totalDocsExamined: 2,
    executionStages: {
      stage: 'FETCH',
      nReturned: 2,
      executionTimeMillisEstimate: 10,
      works: 3,
      advanced: 2,
      needTime: 0,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 2,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 2,
        executionTimeMillisEstimate: 10,
        works: 3,
        advanced: 2,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { name: 1 },
        indexName: 'name_1',
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Vegan", "Vegan"]' ] },
        keysExamined: 2,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  command: { find: 'orders', filter: { name: 'Vegan' }, '$db': 'nxm_201' },
  serverInfo: {
    host: 'LAPTOP-PBPNJUMQ',
    port: 27017,
    version: '6.0.5',
    gitVersion: 'c9a99c120371d4d4c52cbb15dac34a36ce8d3b1d'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,       
    internalQueryFacetMaxOutputDocSizeBytes: 104857600, 
    internalLookupStageIntermediateDocumentMaxSizeBytes:
 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,      
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600
  },
  ok: 1
}
  </pre>
</details>


#### DropIndex

##### ``nxm_201> db.orders.dropIndex({name:1})``

This will also work 

##### ```nxm_201> db.orders.dropIndex(name_1)```

### Get Indexes

#### nxm_201> db.orders.getIndexes()

<details>
  <summary>Click to expand/collapse</summary>
  <pre> 
  [ { v: 2, key: { _id: 1 }, name: '_id_' } ]
  </pre>
</details>

nxm_201> db.orders.createIndex({name:1})

```nxm_201> db.orders.getIndexes()```

<pre>
[
  { v: 2, key: { _id: 1 }, name: '_id_' },
  { v: 2, key: { name: 1 }, name: 'name_1' }
]
</pre>

<a href="https://ibb.co/9Yt5ywZ"><img src="https://i.ibb.co/JkQJrx3/image.png" alt="image" border="0"></a>

## Why name ?

It checks for which one is optimal to use. The one its chooses is called as winning plan.

<a href="https://ibb.co/ch8f69N"><img src="https://i.ibb.co/Xx507Pz/image.png" alt="image" border="0"></a>


```nxm_201> db.orders.find({size:"small", name:"Vegan"}).explain("executionStats")```

<details>
  <summary>Click to expand/collapse</summary>
  <pre>
  {
  explainVersion: '1',
  queryPlanner: {
    namespace: 'nxm_201.orders',
    indexFilterSet: false,
    parsedQuery: {
      '$and': [ { name: { '$eq': 'Vegan' } }, { size: { '$eq': 'small' } } ]
    },
    queryHash: 'C8B14208',
    planCacheKey: '7BB6F16C',
    maxIndexedOrSolutionsReached: false,
    maxIndexedAndSolutionsReached: false,
    maxScansToExplodeReached: false,
🐳🐳 winningPlan: {
      stage: 'FETCH',
      filter: { size: { '$eq': 'small' } },
      inputStage: {
        stage: 'IXSCAN',
        keyPattern: { name: 1 },
        indexName: 'name_1', ↙️↙️
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Vegan", "Vegan"]' ] } 
      }
    },
❌❌ rejectedPlans: [
      {
        stage: 'FETCH',
        filter: { name: { '$eq': 'Vegan' } },
        inputStage: {
          stage: 'IXSCAN',
          keyPattern: { size: 1 },
          indexName: 'size_1', 🚩🚩
          isMultiKey: false,
          multiKeyPaths: { size: [] },
          isUnique: false,
          isSparse: false,
          isPartial: false,
          indexVersion: 2,
          direction: 'forward',
          indexBounds: { size: [ '["small", "small"]' ] }
        }
      },
      {
        stage: 'FETCH',
        filter: {
          '$and': [
            { name: { '$eq': 'Vegan' } },
            { size: { '$eq': 'small' } }
          ]
        },
        inputStage: {
          stage: 'AND_SORTED',
          inputStages: [
            {
              stage: 'IXSCAN',
              keyPattern: { name: 1 },
              indexName: 'name_1',
              isMultiKey: false,
              multiKeyPaths: { name: [] },
              isUnique: false,
              isSparse: false,
              isPartial: false,
              indexVersion: 2,
              direction: 'forward',
              indexBounds: { name: [ '["Vegan", "Vegan"]' ] }
            },
            {
              stage: 'IXSCAN',
              keyPattern: { size: 1 },
              indexName: 'size_1',
              isMultiKey: false,
              multiKeyPaths: { size: [] },
              isUnique: false,
              isSparse: false,
              isPartial: false,
              indexVersion: 2,
              direction: 'forward',
              indexBounds: { size: [ '["small", "small"]' ] }
            }
          ]
        }
      }
    ]
  },
  executionStats: {
    executionSuccess: true,
    nReturned: 1,
    executionTimeMillis: 0,
    totalKeysExamined: 2,
    totalDocsExamined: 2,
    executionStages: {
      stage: 'FETCH',
      filter: { size: { '$eq': 'small' } },
      nReturned: 1,
      executionTimeMillisEstimate: 0,
      works: 4,
      advanced: 1,
      needTime: 1,
      needYield: 0,
      saveState: 0,
      restoreState: 0,
      isEOF: 1,
      docsExamined: 2,
      alreadyHasObj: 0,
      inputStage: {
        stage: 'IXSCAN',
        nReturned: 2,
        executionTimeMillisEstimate: 0,
        works: 3,
        advanced: 2,
        needTime: 0,
        needYield: 0,
        saveState: 0,
        restoreState: 0,
        isEOF: 1,
        keyPattern: { name: 1 },
        indexName: 'name_1',
        isMultiKey: false,
        multiKeyPaths: { name: [] },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: { name: [ '["Vegan", "Vegan"]' ] },
        keysExamined: 2,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  command: {
    find: 'orders',
    filter: { size: 'small', name: 'Vegan' },
    '$db': 'nxm_201'
  },
  serverInfo: {
    host: 'LAPTOP-PBPNJUMQ',
    port: 27017,
    version: '6.0.5',
    gitVersion: 'c9a99c120371d4d4c52cbb15dac34a36ce8d3b1d'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,       
    internalQueryFacetMaxOutputDocSizeBytes: 104857600, 
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,      
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600
  },
  ok: 1
}
  </pre>
  
</details>

## Order here doesn't matter. MongoDB Choose it which one is optimal.

Read About 💡 Compound Index

Node + Express ---> We will not write index here.

We will write in the database. In atlas, compass, terminal.

--------------------------------
--------------------------------
