import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from 'lodash';
import { days, weatherAssets } from './constants';
import { Video } from 'expo-av';
import { BlurView } from 'expo-blur';
import { Shadow } from 'react-native-shadow-2';

const CloseButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ position: 'absolute', top: 10, right: 10 }}>
    <Text style={{ fontSize: 20 }}>X</Text>
  </TouchableOpacity>
);

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({
    current: {
      condition: {
        text: 'Sunny',
      },
      temp_c: 25,
      wind_kph: 20,
      humidity: 50,
    },
    location: {
      name: 'Novosibirsk',
      country: 'Russia',
    },
    forecast: {
      forecastday: [
        {
          date: '2023-07-30',
          day: {
            condition: {
              text: 'Sunny',
            },
            maxtemp_c: 28,
            maxwind_kph: 25,
            avghumidity: 40,
          },
          astro: {
            sunrise: '05:30 AM',
          },
        },
        {
          date: '2023-07-31',
          day: {
            condition: {
              text: 'Partly cloudy',
            },
            maxtemp_c: 26,
            maxwind_kph: 22,
            avghumidity: 45,
          },
          astro: {
            sunrise: '05:31 AM',
          },
        },
        {
          date: '2023-08-01',
          day: {
            condition: {
              text: 'Cloudy',
            },
            maxtemp_c: 24,
            maxwind_kph: 18,
            avghumidity: 50,
          },
          astro: {
            sunrise: '05:32 AM',
          },
        },
      ],
    },
  });
  const [loading, setLoading] = useState(false);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');

  const handleSearch = (value) => {
    if (value.length > 2) {
      // Simulating API call to fetch locations
      const fakeLocations = [
        { name: 'New York', country: 'USA' },
        { name: 'London', country: 'UK' },
        { name: 'Paris', country: 'France' },
      ];
      setLocations(fakeLocations);
    } else {
      setLocations([]);
    }
  };

  const fetchWeatherDataForLocation = (loc) => {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    // Simulating API call to fetch weather data
    const fakeWeather = {
      current: {
        condition: {
          text: 'Sunny',
        },
        temp_c: 27,
        wind_kph: 22,
        humidity: 55,
      },
      location: {
        name: loc.name,
        country: loc.country,
      },
      forecast: {
        forecastday: [
          {
            date: '2023-08-02',
            day: {
              condition: {
                text: 'Sunny',
              },
              maxtemp_c: 29,
              maxwind_kph: 24,
              avghumidity: 45,
            },
            astro: {
              sunrise: '05:33 AM',
            },
          },
          {
            date: '2023-08-03',
            day: {
              condition: {
                text: 'Partly cloudy',
              },
              maxtemp_c: 26,
              maxwind_kph: 20,
              avghumidity: 50,
            },
            astro: {
              sunrise: '05:34 AM',
            },
          },
          {
            date: '2023-08-04',
            day: {
              condition: {
                text: 'Cloudy',
              },
              maxtemp_c: 23,
              maxwind_kph: 18,
              avghumidity: 60,
            },
            astro: {
              sunrise: '05:35 AM',
            },
          },
        ],
      },
    };
    setWeather(fakeWeather);
    setLoading(false);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const { current, location } = weather;

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleTouchableOpacity = (item, dayName) => {
    setSelectedWeather(item);
    setSelectedDay(dayName);
    setModalVisible(true);
  };

  const video = useRef(null);

  if (loading) {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <Video
        ref={video}
        source={weatherAssets[current?.condition?.text]?.video}
        resizeMode="cover"
        shouldPlay
        isMuted
        isLooping
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <Image
        blurRadius={70}
        source={require('./assets/images/bg.png')}
        style={{ position: 'absolute', height: '100%', width: '100%', opacity: 0.5 }}
      />
      {/* Поиск */}
      <View
        style={{
          height: '7%',
          marginBottom: 10,
          marginHorizontal: 4,
          position: 'relative',
          zIndex: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 999,
            position: 'relative',
          }}>
          {showSearch && (
            <TextInput
              onChangeText={handleTextDebounce}
              placeholder="Выберите город"
              placeholderTextColor={'white'}
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                width: '100%',
                borderRadius: 999,
                paddingLeft: 6,
                height: 40,
                top: 11,
                color: 'white',
              }}
            />
          )}
          <KeyboardAvoidingView behavior="padding">
            <TouchableOpacity
              onPress={() => setShowSearch(!showSearch)}
              style={{
                borderRadius: 999,
                top: 8,
                right: 4,
                paddingTop: 1,
                position: 'absolute',
              }}>
              <MagnifyingGlassIcon size="20" color="white" />
            </TouchableOpacity>
          </KeyboardAvoidingView>

          {locations.length > 0 && showSearch && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                backgroundColor: 'gray',
                top: 24,
                borderRadius: 16,
              }}>
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => fetchWeatherDataForLocation(loc)}
                    key={index}
                    style={{
                      paddingHorizontal: 5,
                      paddingVertical: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <MapPinIcon size="20" color="gray" />
                    <Text style={{ marginLeft: 2 }}>
                      {loc?.name}, {loc?.country}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
      {/* Прогноз */}
      <BlurView
        intensity={100}
        style={{
          marginHorizontal: 4,
          flex: 1,
          marginBottom: 6,
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}>
        <Shadow
          startColor="#a3a3a31c"
          safeRender={true}
          paintInside={true}
          style={{ paddingVertical: 4 }}>
          <View style={{ marginHorizontal: 4, flex: 1, marginBottom: 6 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 6,
              }}>
              {location?.name},
              <Text style={{ color: 'gray', fontSize: 16, fontWeight: 'bold' }}>
                {' ' + location?.country}
              </Text>
            </Text>
            {/* Иконка погоды */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Image
                source={weatherAssets[current?.condition?.text]?.image}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View style={{ justifyContent: 'space-between', paddingVertical: 4 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 40, marginTop: 6 }}>
                {current?.temp_c}&#176;
              </Text>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 20, letterSpacing: 1 }}>
                {weatherAssets[current?.condition.text]?.description}
              </Text>
            </View>
          </View>
          {/* Другая статистика */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 4,
              marginTop: 4,
            }}>
            <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
              <Image source={require('./assets/icons/wind.png')} style={{ width: 6, height: 6 }} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                {Math.round(((current?.wind_kph * 1000) / 3600) * 100) / 100} м/с
              </Text>
            </View>
            <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
              <Image source={require('./assets/icons/drop.png')} style={{ width: 6, height: 6 }} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                {current?.humidity}%
              </Text>
            </View>
            <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
              <Image source={require('./assets/icons/sunny.png')} style={{ width: 6, height: 6 }} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                {weather?.forecast?.forecastday[0]?.astro.sunrise}
              </Text>
            </View>
          </View>
        </Shadow>
      </BlurView>
      {/* Прогноз на другие дни */}
      <View style={{ marginBottom: 2, paddingVertical: 3, marginTop: 10 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 15 }}
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 1 }}>
          {weather?.forecast?.forecastday?.map((item, index) => {
            let date = new Date(item.date);
            let options = { weekday: 'long' };
            let dayName = date.toLocaleDateString('en-US', options);
            dayName = dayName.split(',')[0];
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleTouchableOpacity(item, dayName)}
                style={{ backdropBlurRadius: 3 }}>
                <BlurView
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    paddingVertical: 10,
                    marginRight: 10,
                  }}>
                  <Image
                    source={weatherAssets[item?.day?.condition?.text]?.image}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text style={{ color: 'white' }}>{days[dayName]?.short}</Text>
                  <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    {Math.round(item?.day?.maxtemp_c)}&#176;
                  </Text>
                </BlurView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {selectedWeather && (
              <BlurView
                intensity={100}
                blurReductionFactor={5}
                style={{ relative: 5, padding: 5, backgroundColor: 'gray' }}>
                <CloseButton onPress={closeModal} />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>
                    {days[selectedDay]?.full},{' '}
                    {new Date(selectedWeather?.date).toLocaleDateString('ru-RU').slice(0, -5)}
                  </Text>
                  <Image
                    source={weatherAssets[selectedWeather?.day?.condition?.text]?.image}
                    style={{ height: 28, width: 28, alignSelf: 'center', marginVertical: 5 }}
                  />
                </View>
                <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 5 }}>
                  {weatherAssets[selectedWeather?.day?.condition.text]?.description}
                </Text>
                <Text style={{ fontSize: 40, textAlign: 'center', color: 'black' }}>
                  {Math.round(selectedWeather?.day?.maxtemp_c)}&#176;
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                  }}>
                  <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
                    <Image
                      source={require('./assets/icons/windblack.png')}
                      style={{ width: 6, height: 6 }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>
                      {Math.round(((selectedWeather?.day?.maxwind_kph * 1000) / 3600) * 100) / 100}{' '}
                      м/с
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
                    <Image
                      source={require('./assets/icons/dropblack.png')}
                      style={{ width: 6, height: 6 }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>
                      {selectedWeather?.day?.avghumidity}%
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', spaceX: 2, alignItems: 'center' }}>
                    <Image
                      source={require('./assets/icons/sunnyblack.png')}
                      style={{ width: 6, height: 6 }}
                    />
                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 12 }}>
                      {selectedWeather.astro.sunrise}
                    </Text>
                  </View>
                </View>
              </BlurView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
