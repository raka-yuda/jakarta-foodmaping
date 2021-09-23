import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import config from "@arcgis/core/config";

import { useEffect, useRef } from "react";

const MainMap = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      config.apiKey =
        typeof process.env.ARCGIS_API_KEY === "string"
          ? process.env.ARCGIS_API_KEY
          : "";

      const map = new ArcGISMap({
        basemap: "arcgis-topographic",
      });

      const view = new MapView({
        map,
        center: [-118.80657463861, 34.0005930608889],
        zoom: 10,
        container: mapDiv.current,
        constraints: {
          snapToZoom: false,
        },
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const point = new Point({
        longitude: -118.80657463861,
        latitude: 34.0005930608889,
      });

      const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      };

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
      });
      graphicsLayer.add(pointGraphic);

      const polyline = new Polyline({
        paths: [
          [
            [-118.821527826096, 34.0139576938577],
            [-118.814893761649, 34.0080602407843],
            [-118.808878330345, 34.0016642996246],
          ],
        ],
      });

      const simpleLineSymbol = {
        type: "simple-line",
        color: [226, 119, 40], // Orange
        width: 2,
      };

      const polylineGraphic = new Graphic({
        geometry: polyline,
        symbol: simpleLineSymbol,
      });
      graphicsLayer.add(polylineGraphic);

      const polygon = new Polygon({
        rings: [
          [
            [-118.818984489994, 34.0137559967283],
            [-118.806796597377, 34.0215816298725],
            [-118.791432890735, 34.0163883241613],
            [-118.79596686535, 34.008564864635],
            [-118.808558110679, 34.0035027131376],
          ],
        ],
      });

      const simpleFillSymbol = {
        type: "simple-fill",
        color: [255, 255, 255, 0.8],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      };

      const popupTemplate = {
        title: "{Name}",
        content: "{Description}",
      };
      const attributes = {
        Name: "Graphic",
        Description: "I am a polygon",
      };

      const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: simpleFillSymbol,
        attributes: attributes,
        popupTemplate: popupTemplate,
      });
      graphicsLayer.add(polygonGraphic);
    }
  }, []);

  return <div className="mapDiv w-full h-80" ref={mapDiv}></div>;
};

export default MainMap;
