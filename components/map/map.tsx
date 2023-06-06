import React, {
  useMemo,
  useRef,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  GoogleMap,
  LoadScriptNextProps,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

import { LatLngLiteral, MapOptions, Location } from "../../lib/types";
import classes from "./map.module.css";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useRouter } from "next/router";

type Props = {
  hoveredLocation?: Location | null;
  setHoveredLocation?: Dispatch<SetStateAction<Location | null>>;
  hoveringLocation?: boolean;
  marker_locations: { name: string; address: string }[];
  address?: Record<string, string>;
};

const googleMapsLibraries: LoadScriptNextProps["libraries"] = ["places"];

const Map = ({
  hoveredLocation,
  hoveringLocation,
  marker_locations,
  address,
}: Props) => {
  const router = useRouter();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: googleMapsLibraries,
  });
  const [mapInstance, setMapInstance] = useState<null | google.maps.Map>(null);
  const [markers, setMarkers] = useState<
    { latLng: LatLngLiteral; name: string }[] | null
  >(null);
  const [singleLocation, setSingleLocation] = useState<null | LatLngLiteral>(
    null
  );

  const winDim = useWindowDimensions();

  const mapRef = useRef<google.maps.Map>();

  const center = useMemo<LatLngLiteral>(() => ({ lat: 29.92, lng: -98 }), []);

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "508945d8f58a5f97",
    }),
    []
  );

  const getGeos = async (address: { address: string; name: string }[]) => {
    if (mapInstance) {
      const newLocations = address.map(async (location) => {
        const res = await getGeocode({
          address: location.address,
        });
        console.log(res, location.address, "getgeos");
        const latLng = getLatLng(res[0]);
        return { name: location.name, latLng };
      });
      console.log(newLocations, "mewlocations");
      const allMarkers = await Promise.all(newLocations);
      console.log(allMarkers, "allmarkers");
      setMarkers(allMarkers);
    }
  };

  const getLocationForMarker = useCallback(
    async (address: string) => {
      const result = await getGeocode({ address });
      const latLng = await getLatLng(result[0]);
      // if (typeof winDim.width === "number" && winDim.width > 800) {
      //   latLng.lat = latLng.lat + 0.01;
      // } else {
      //   latLng.lng = latLng.lng - 0.01;
      // }
      // mapRef.current?.panTo(latLng);
      mapRef.current?.panTo(latLng);
      mapRef.current?.setZoom(13);
      // mapRef.current?.setZoom(10);
      setTimeout(() => {
        mapRef.current?.setZoom(15);
      }, 1000);
    },
    [winDim]
  );

  useEffect(() => {
    if (markers && markers.length === 1 && !singleLocation) {
      console.log(markers);
      setSingleLocation(markers[0].latLng);
    }
    console.log(singleLocation);
  }, [markers, singleLocation]);

  useEffect(() => {
    if (marker_locations && mapInstance) {
      getGeos(marker_locations);
    }
  }, [mapInstance]);

  const onLoad = useCallback(async (map: google.maps.Map) => {
    mapRef.current = map;
    setTimeout(() => {
      setMapInstance(map);
    }, 100);
  }, []);

  useEffect(() => {
    if (!hoveringLocation) {
      return;
    }
    if (!hoveredLocation) {
      return;
    }

    mapRef.current?.setZoom(11);
    let timeout = setTimeout(() => {
      getLocationForMarker(
        `${
          hoveredLocation.address.street_address.includes("Suite")
            ? hoveredLocation.address.street_address.split("Suite")[0]
            : hoveredLocation.address.street_address
        } ${hoveredLocation.address.city_state_zip}`
      );
    }, 1000);

    return () => {
      clearTimeout(timeout);
      mapRef.current?.setZoom(12);
      setTimeout(() => {
        mapRef.current?.setZoom(11);
        mapRef.current?.panTo(center);
      }, 600);
    };
  }, [hoveredLocation, hoveringLocation, markers]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={singleLocation ? 15 : 11}
          center={singleLocation ? singleLocation : center}
          mapContainerClassName={classes.map_container}
          options={options}
          onLoad={onLoad}
          mapTypeId="508945d8f58a5f97"
        >
          {mapInstance &&
            markers?.map((marker, i) => {
              console.log(marker, "stufffffffff");
              return (
                <Marker
                  position={marker.latLng}
                  title={marker.name}
                  icon={{
                    url: "/img/ez-marker.png",
                    scaledSize: new google.maps.Size(70, 70),
                  }}
                  animation={window.google.maps.Animation.DROP}
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps/search/ez+eats+${marker_locations[i].address}`,
                      "_blank"
                    );
                  }}
                />
              );
            })}
        </GoogleMap>
      )}
    </>
  );
};

Map.defaultProps = {
  hoveredLocation: null,
  hoveringLocation: null,
  setHoveredLocation: null,
  singleLocation: null,
};

export default Map;
