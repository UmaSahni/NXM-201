# What is Authentication
- It's a process of Indentifying who the user is.

# Why do we need to Indentifying someOne ?

- Your progress will not be saved.

# Authorisation ?
- It's a process of determining whatt access the user has.

### Example.

If masai office can any one enter masai office ? No. How to approve my Authenticate myself. 

Once I go inside I will not be Authorise to go inside finantial room.


# Authentication 
    - register / signup
        - {email, password}
        - Hash the password (security)
        - 
    - login
        
    - 

# What is hashing ?

Encrypting and storing and dcrypting ❌❌❌

They both are diffrent.

password 

pwd - qxe
momo - npnp 
cab - dbc
mno <-- nop

key --> 2*nextalphabet

Encryption is reversible
    Encrypt <------> Decrypt
               key

# How is hashing different ?
hashing is irreversible
There is no key in hashing.

xyz --> algorithm --> fjkdbfiuqhiffhff
abc --> algorithm --> asoishfhfhfiwh8fhf

What algorithm does it converts it to the non determitable string.

So we don't what was the logic used in the algorithm.

nihal@123 --> hash algorithm --> asdfghjkl@321

Do we have the real password of that in our db ? 

No , So how do we check whether the password was wrong or right ?

/login;
masai@123 --> ❌
we are again run through the same algorithm.

masai@123 --> hash algorithm --> knlnisihfkehifhewgn

/login 
nihal@123 --> hash algorithm --> asdfghjkl@321

So compare hashPassword (asdfghjkl@321) with db password (asdfghjkl@321)

"Compare all the possible string"

Why do we need it ?
(security)
salt rounds 
secret key 

# What is salt ?

Real world application : Why do we add salt ?
Add some taste adds flovor.

Each time with hash algorithm + salt (adds something extra.)

salting rounds -->

nihal --> hash algorithm + salt (3 salt rounds) --> ajkssfssf 🚩
 

nihal --> hash algorithm + salt (3 salt rounds) --> ajkssfssf 🚩


nihal --> hash algorithm + salt (8 salt rounds) --> dgddhdhdj

"With same salt round output will be same."

(It is now difficult to keep this many combinations of diffrent salt rounds.)

hash algorithm + salt + secret_key :

(Even if someone generate all possible combinations of passwords with salt rounds they will not have secret_key. So, they will not get same hash)

# What is more secure hashing or Encryption ?

Ans : Hashing is more secure. 

# When to use Encryption ? Can we use Encryption for whatsapp text message ?

Ans : No, since this is reversible so if someone send "Hi" and it becomes ("snsioh"). So will they be able to read.

There is no algorithm to reverse. "snsioh" 

--------------------------------------

 - login
 {email, password}
 compare with the hashed string ? "Login successfull", generate and give back jwt :"Wrong password"

 # Why are we giving them token?
 For allowing access to specific routes.

 GET / reports ---> {email, password} againg comparing it with the hashed password. if it is true then only allowing the access. Is this process true? No what will happen in the fronted ?


If token is valid ? we give access to the routes : "Login first"

// 10 minutes
    express application -->
    Authentication 
    / --> doesn't reuires Authentication
    / reports --> requires Authentication



# Backlisting

GET Authenticated - /logout
Make a request to logout

Token we wil have 
blacklist that token --> mentain a blacklist where you add this token.

From the ui the user has clicked on logout button then 

If the user in the fronted going to /reports route. And the token is not removed from the local stroage. then user should not get response.

jwt.verify(token) , // true

GET Authenticate , /reports
    first check if __token__ is present in blacklist
    ? login again
    :jwt.verify() 
                ?  /reports :
                

