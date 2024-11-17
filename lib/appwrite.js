import { Client, Account, ID, Avatars, Databases, Query, Storage } from "react-native-appwrite"

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
const storage = new Storage(client)


export const createUser = async ({email, password, username}) => {
    
    try{
        // console.log("Creating user with:", email, password, username);
        const newAcc = await account.create(ID.unique(), email, password, username)

        if(!newAcc){
            throw Error
        }
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

        console.log("Current account fetched:", currAccount); // Log the result
        if (!currAccount) {
            throw new Error("Failed to fetch the current account.");
        }

        const currUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currAccount.$id)]
        )

        console.log("Current user documents fetched:", currUser.documents[0]);
        if (!currUser || currUser.documents.length === 0) {
            throw new Error("No user document found for the current account.");
        }
        return currUser.documents[0]

    } catch (error) {
        console.error("Error in getCurrentUser:", error.message);
        throw new Error(error.message || "Failed to fetch current user.");
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

export const signOut = async () =>{
    try{
        console.log('before logout')
        const session = await account.deleteSession('current')
        console.log('after logout',session)
        return session
    }catch(error){
        throw new Error(error)
    }
    
}

export const getFilePreview = async (fileId, type) =>{
    let fileUrl

    try {

        if(type === 'video'){
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        } else if (type === 'image'){
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000,2000, 'top', 100)
        }else{
            throw new error('Invalid file type')
        }
        
    } catch (error) {
        throw new Error(error)
    }
    if(!fileUrl){
        throw Error
    }

    return fileUrl
}

export const uploadFile = async (file,type)=>{
    if(!file){
        return;
    }
    const {mimeType, ...rest} = file;
    const asset = {type:mimeType, ...rest};

    try {
        const uploadFile = await storage.createFile(
            appwriteConfig.storageId, ID.unique(), asset
        )

        const fileUrl = await getFilePreview(uploadFile.$id, type)
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}


export const createVideo = async (form) =>{

    console.log('createVideo func form:',form)
    try{
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video,'video')
        ])

        const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.videoCollectionId, ID.unique(),{
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            creator: form.userId

        })
        return newPost
    }catch(error){
        throw new Error(error)
    }
    
}