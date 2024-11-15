import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite"

export const appwriteConfig = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.jz.aora',
    projectId:'6734308b001bcc856b2c',
    databaseId: "673431f0003a05382735",
    userCollectionId:"6734321400089ec25db9",
    videoCollectionId:"6734324200165eac1f3b",
    storageId:"673433d90019009c7b09"
}

const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)


const account = new Account(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async ({email, password, username}) => {
    
    try{
        console.log("Creating user with:", email, password, username);
        const newAcc = await account.create(ID.unique(), email, password, username)

        // if(!newAcc){
        //     throw Error
        // }
        const avatarUrl = avatars.getInitials(username)
        await signIn(email, password)

        const newUser = await databases.createDocument(appwriteConfig.databaseId,appwriteConfig.userCollectionId, ID.unique(),{
            accountId: newAcc.$id,
            email,
            username,
            avatar: avatarUrl
        })

        return newUser
    }catch(error){
        console.log(error.message)
        throw new Error(error.message)
    }
};

export const signIn= async (email, password) =>{

    try{
        // console.log('before signin', email, password)
        const session = await account.createEmailPasswordSession(email, password)
        return session
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

export const getCurrentUser = async () => {
    try{
        const currAccount = await account.get();

        if(!currAccount){
            throw Error;
        }
        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currAccount.$id)]
        )

        if(!currUser){
            throw Error;
        }
        return currUser.documents[0]

    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

export const getAllPost = async ()=>{
    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        )

        return posts.documents
    }catch(error){
        console.log(error)

        throw new Error(error)
    }
}
export const getLatestPost = async ()=>{
    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents
    }catch(error){
        console.log(error)

        throw new Error(error)
    }
}

export const searchPost = async (query)=>{
    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.search('title', query)]
        )

        return posts.documents
    }catch(error){
        console.log(error)

        throw new Error(error)
    }
}

export const getUserPost = async (userId)=>{
    try{
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents
    }catch(error){
        console.log(error)

        throw new Error(error)
    }
}