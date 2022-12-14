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
  marker_locations: string[];
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
  const [markers, setMarkers] = useState<LatLngLiteral[] | null>(null);

  const winDim = useWindowDimensions();

  const mapRef = useRef<google.maps.Map>();

  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 29.96159484639462, lng: -98.04325903133513 }),
    []
  );

  const options = useMemo<MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
      mapId: "508945d8f58a5f97",
    }),
    []
  );

  const getGeos = async (address: string[]) => {
    if (mapInstance) {
      const newLocations = await Promise.all(
        address.map(async (location) => {
          const res = await getGeocode({ address: location });
          const latLng = getLatLng(res[0]);
          return latLng;
        })
      );
      setMarkers(await Promise.all(newLocations));
    }
  };

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

  const getLocationForMarker = useCallback(
    async (address: string) => {
      const result = await getGeocode({ address });
      const latLng = await getLatLng(result[0]);
      if (typeof winDim.width === "number" && winDim.width > 800) {
        latLng.lat = latLng.lat + 0.01;
      } else {
        latLng.lng = latLng.lng - 0.01;
      }
      // mapRef.current?.panTo(latLng);
      mapRef.current?.panTo(latLng);
      mapRef.current?.setZoom(12);
      // mapRef.current?.setZoom(10);
      setTimeout(() => {
        mapRef.current?.setZoom(14);
      }, 1000);
    },
    [winDim]
  );

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
        `${hoveredLocation.address.street_address} ${hoveredLocation.address.city_state_zip}`
      );
    }, 1000);

    return () => {
      clearTimeout(timeout);
      mapRef.current?.setZoom(12);
      setTimeout(() => {
        mapRef.current?.setZoom(9);
        mapRef.current?.panTo(center);
      }, 600);
    };
  }, [hoveredLocation, hoveringLocation, markers]);

  return (
    <>
      {isLoaded && (
        <GoogleMap
          zoom={9}
          center={center}
          mapContainerClassName={classes.map_container}
          options={options}
          onLoad={onLoad}
          mapTypeId="508945d8f58a5f97"
        >
          {mapInstance &&
            markers?.map((marker, i) => (
              <Marker
                position={marker}
                title="EZ-Eats"
                icon={{
                  url: "/img/ez-marker.png",
                  scaledSize: new google.maps.Size(70, 70),
                }}
                animation={window.google.maps.Animation.DROP}
                onClick={() => {
                    window.open(
                      `https://www.google.com/maps/search/ez+eats+${marker_locations[i]}`,
                      "_blank"
                    );
                }}
              />
            ))}
        </GoogleMap>
      )}
    </>
  );
};

Map.defaultProps = {
  hoveredLocation: null,
  hoveringLocation: null,
  setHoveredLocation: null,
};

export default Map;
