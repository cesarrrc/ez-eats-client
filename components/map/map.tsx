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
import { GoogleMap, Marker } from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";

import { Location } from "../../lib/data";
import { LatLngLiteral, MapOptions } from "../../lib/types";
import classes from "./map.module.css";

type Props = {
  hoveredLocation: Location | null;
  setHoveredLocation: Dispatch<SetStateAction<Location | null>>;
  hoveringLocation: boolean;
};

const Map = ({
  hoveredLocation,
  setHoveredLocation,
  hoveringLocation,
}: Props) => {
  const [mapInstance, setMapInstance] = useState<null | google.maps.Map>(null);

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

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    setTimeout(() => {
      setMapInstance(map);
    }, 100);
  }, []);

  const getLocationForMarker = useCallback(async (address: string) => {
    const result = await getGeocode({ address });
    console.log(result, "RESULTS!!");
    const latLng = await getLatLng(result[0]);
    console.log(latLng);
    mapRef.current?.panTo(latLng);
    mapRef.current?.setZoom(12);
  }, []);

  useEffect(() => {
    console.log(hoveredLocation);

    if (hoveredLocation) {
      console.log(mapRef.current);
      getLocationForMarker(hoveredLocation.address);
      return;
    }
    if (!hoveringLocation) {
      mapRef.current?.panTo(center);
      mapRef.current?.setZoom(10);
    }

    return () => {
      setHoveredLocation(null);
    };
  }, [hoveredLocation, hoveringLocation]);

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName={classes.map_container}
      options={options}
      onLoad={onLoad}
      mapTypeId="508945d8f58a5f97"
    >
      {mapInstance && (
        <>
          <Marker
            position={{ lat: 29.89860911020278, lng: -97.91561292603804 }}
            title="EZ-Eats"
            icon={{
              url: "/img/ez-marker.png",
              scaledSize: new google.maps.Size(70, 70),
            }}
          />
          <Marker
            position={{ lat: 29.931086529440847, lng: -98.07150050052239 }}
            title="EZ-Eats"
            icon={{
              url: "/img/ez-marker.png",
              scaledSize: new google.maps.Size(70, 70),
            }}
          />
          <Marker
            position={{ lat: 30.061958411230297, lng: -98.09287987726255 }}
            title="EZ-Eats"
            icon={{
              url: "/img/ez-marker.png",
              scaledSize: new google.maps.Size(70, 70),
            }}
          />
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
