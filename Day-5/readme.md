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

# Refresh Tokens:

    - Why we give Token ? 

    - Token expiry ?
        - 1 hour After that token will not be valid.
    - Why do we expire token ?
        - One kind of security.
        - Reduce the risk of token leak.

When you login always token new token is generated.

In industry - 7 days on average

Disadvange
1. Bad user experience
2. 7 days of token expiry
the user will don't know when it will expire.

UI form --> ......., ......., .....,  --> when submit button was clicked.
/ submit.  Token expire.

All data were lost.

# Refresh Token 

/login 

    When user go to /login route he will get two Tokens
   
    1. jwt token (7 days expiry)
    2. Refresh token (28 days expiry)

    expiry of refresh token > expiry of normal token.

# But why to do all this Jhanjhat ????

Ans : Suppose you are traveling in a train then you have 2500 rupees . Will you keep all token at same place ? 

2000 rupees ---> Place A  (Suppose place A money got lost.)
500 rupees ----> Place B

Why Not ?

What to do A got lost. Use 500 rupees to ATM and get more cash for dinner.


Place A is normal token.
Place B is backup / refresh token.

1. Not having any expiry. Good UX, bad security
2. Having expiry every 7 days. good security, little inconvience.
3. Having expiry 7 days with backup token for 28 days. - good security, good ux.

If refresh token gets leaks ?

The Authentication is lost.

Will refresh token use ?
1. /reports;
2. /getnewnormaltoken

how long newnormaltoken will be valid ?
Ans : 7 Days.

Suppose 28 days are passed 
/login again.

After the 7 days when we give new normal token will do need to give new refresh token ?

Ans : No. Then 28 days never get over.



------------------------------------------

Fronted work

When the token will be expired you will be getting a message from jwt.

error.message : "token expired"

In fronted developer will quickly check if error.message is "token expired"

then make a request to GET - /getnewnormaltoken 
Now he will get new token now use that token to /reports or /submit. 

Flow of the user will not break.


Is blacklist and refresh token same ?
No.

blacklist --> logout
refresh token --> backup token