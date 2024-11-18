import { StyleSheet, Text, View,FlatList} from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import {searchPost} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const {query} = useLocalSearchParams()
  const {data:posts, refetch} = useAppwrite(()=>searchPost(query))

  useEffect(()=>{
    refetch()
  },[query])
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        
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
          <View className='my-6 px-4'>
            
            <Text className='text-sm text-gray-100 font-pmedium'>
              Search results for
            </Text>
            <Text className='text-2xl text-gray-100 font-pmedium'>
              {query}
            </Text>
            <View className='mt-6 mb-8'>
              <SearchInput initialQuery={query}/>

            </View>
          </View>
        )}

        ListEmptyComponent={()=>(
          <EmptyState title='No Videos Found' subtitle='No videos found for this search.'/>
        )}
      />
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})