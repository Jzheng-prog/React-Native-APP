import { StyleSheet, Text, View,FlatList, Image, Alert,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../../constants/images'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import {getAllPost, getLatestPost} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {

  const [refreshing, setRefreshing] = useState(false)

  const {data:posts, refetch} = useAppwrite(getAllPost)
  const {data:lastestPosts,} = useAppwrite(getLatestPost)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)

  }
  // console.log({posts})
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        className='border border-white'
        // data={[]}
        data={posts}
        keyExtractor={(item)=>item.$id}
        renderItem={({item})=>(
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            avatar={item.creator?.avatar}
            username={item.creator?.username}
          />
        )}
        ListHeaderComponent={()=>(
          <View className='border border-white my-6 px-4 space-y-6'>
            <View className='border border-white justify-between items-start flex-row mb-6'>
              <View className='border border-white'>
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Welcome Back
                </Text>
                <Text className='text-2xl text-gray-100 font-pmedium'>
                  Aora
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain'/>
              </View>
            </View>
            <SearchInput/>

            <View className='w-full flex-1 pt-5 pb-8 border border-gray-300'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Lastest Videos
              </Text>
              <Trending posts={lastestPosts}/>
            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState title='No Videos Found' subtitle='Be the first one to upload a video'/>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})