import React, { useState, useRef } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
  Container,
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
} from './styles';

interface Props {
    imagesUrl: string[];
}
          {/* 
              <ImageIndex active={false}/>
            <ImageIndex active={false}/>
            <ImageIndex active={false}/> 
            */
          }

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}


export function ImageSlider({ imagesUrl }: Props){

  const [imageIndex, setImageIndex] = useState(0);

  const indexChanged = useRef((info: ChangeImageProps) => {
    console.log(info)
    //setImageIndex(info.viewableItems[0].index!);
  })

  return (
    <Container>
        <ImageIndexes>
          {
            imagesUrl.map((_, index ) => (
              
              <ImageIndex 
                key={String(index)}
                active={true}/>

            ))

          }

        </ImageIndexes>

        
            <FlatList
              data={imagesUrl}
              keyExtractor={key => key}
              renderItem={({ item }) => (
                <CarImageWrapper>
                  <CarImage 
                    source={{ uri: item }}
                    resizeMode="contain"
                  />
                </CarImageWrapper>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={indexChanged.current}
            />

        
    </Container>
  );
}