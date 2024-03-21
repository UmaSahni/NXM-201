## What is Authentication ?
Ans: Identifying who some one.

## What is Authorisation ?
Ans : Giving permission to access diffrent things.

[![image.png](https://i.postimg.cc/mkqjHVZW/image.png)](https://postimg.cc/dZ2GM2T5)

[![image.png](https://i.postimg.cc/Gh8qC0zL/image.png)](https://postimg.cc/2VY4QKPM)

RBAC == Role based Access Control

Based on the user's role the user gets the required permission or access rights.

1. role - admin
2. age - 
3. Nationality - Indian

[![image.png](https://i.postimg.cc/Dyr5ZQVH/image.png)](https://postimg.cc/BXv27KnB)

Not OAuth - It's Auth

[![image.png](https://i.postimg.cc/rwh10Qfn/image.png)](https://postimg.cc/fV9t1jnm)


# Authorisation

1. Define roles 
/products/product/edit ?? Can't edit


2. Define permission

3. Write Middleware

4. Use Middleware

# Admin role there ? 

2 ways 

Masai Startup
Employee joins get a 
mail : 
nihal@masaischool.com -LMS
{
    role : admin
}
salu@masaischool.com - PI 
{
    role :"PI"
}

Who is deciding the role ?

Ans : The backend

It is done manually on database. For small company

Or Small ui

--------------------------------------------------
In Big company 

Here there is something tree like structure. Where Suppose Nihal can update the status / role for only those people who reports to Nihal. 

He can not go and update role for people who reports to Albert.

It is similar to relationship You are even login you can not delete everyones posts. 

---------------------------------------------------

Authorisation Completed


