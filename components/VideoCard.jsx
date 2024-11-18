import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { icons } from '../constants'
import { TouchableOpacity } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video';
import Icon from 'react-native-vector-icons/Ionicons';

const VideoCard = ({title, thumbnail,video,avatar,username}) => {

    const [play, setPlay] = useState(false) 
    const [openDotMenu, setOpenDotMenu] = useState(false) 
    const [liked, setLiked] = useState(false);


    const player = useVideoPlayer(video);
    

  return (
    <View className='flex flex-col items-center p-4 mb-14 border border-gray-100/10 mx-1 rounded-lg'>
        <View className='flex flex-row gap-3 items-start justify-center py-3'>

            <View className='flex justify-center items-center flex-row flex-1'>
                <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center'>
                    <Image source={{uri:avatar}} className="w-full h-full rounded-lg" resizeMode="cover"/>
                </View>
                <View className='justify-center flex-1 ml-3 gap-y-1'>
                    <Text className='text-xs font-psemibold text-white' numberOfLines={1}>{title}</Text>
                    <Text className='text-xs font-pregular text-gray-100' numberOfLines={1}>{username}</Text>
                </View>
            </View>

            <TouchableOpacity className={`${openDotMenu? 'py-0':'py-4'} flex items-center justify-center`} on onPress={()=>setOpenDotMenu(!openDotMenu)}>

                {openDotMenu? 
                    (<TouchableOpacity className='py-1' onPress={()=>setLiked(!liked)}>
                        <Icon
                            name={liked? 'heart':'heart-outline'} // Filled or outlined heart
                            size={35}
                            color={liked? 'orange':'white'}
                        />
                    </TouchableOpacity>)
                    :
                    <Image source={icons.menu} resizeMode='contain' className='w-5 h-5'/>
                }
            </TouchableOpacity>
        </View>
      
        {play ? (
            <View className='rounded-xl flex-1 items-center justify-center flex mt-3'>
                <VideoView style={styles.video} player={player} nativeControls resizeMode='cover'/>
            </View>        
        ):(
            <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center flex' activeOpacity={0.7} onPress={()=>setPlay(true)}>
                <Image source={{uri:thumbnail}} className='w-full h-full rounded-xl' resizeMode='cover'/>
                <Image source={icons.play} className='w-12 h-12 absolute' resizeMode='contain'/>
            </TouchableOpacity>
        )}
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({
    video: {
        width: 400,
        height: 225,
        borderRadius: 12, 
    }
  });