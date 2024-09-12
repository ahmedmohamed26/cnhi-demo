import OvalsIcons from "@/assets/icons/Ovals.png";
import ComplexTable from "@/components/ComplexTable";
import GoogleMap from "@/components/GoogleMap.jsx";
import useResultModal from "@/hooks/useResultModal";
import ApiOptions, { initialState } from "@/reducers/ApiOptions";
import { fetchAllBuildings } from "@/services/buildings";
import serializeAndDownload from "@/utils/exportCSV";
import { MarkerF, DrawingManager, Polygon } from "@react-google-maps/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import MapDrawer from "../../../components/MapDrawer";
import ActionButton from "../actionsButton";
import BuildingsForm from "./form";
import dayjs from "dayjs";
import { createBuilding, updateBuilding } from "../../../services/buildings";
import { useSelector } from "react-redux";

export default function BuildingsComponent() {
  const { t, i18n } = useTranslation();
  const [filterOptions, dispatch] = useReducer(ApiOptions, initialState);
  const globalModal = useResultModal();
  const [mapDrawerOpen, setMapDrawerOpen] = useState(false);
  const [drawingMode, setDrawingMode] = useState("polygon");
  const { user } = useSelector((state) => state.auth);
  const {
    data: buildings,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["buildings", filterOptions],
    queryFn: () => fetchAllBuildings(filterOptions),
  });

  const [mode, setMode] = useState("create");
  const Mutation = useMutation({
    mutationFn: (values) =>
      mode == "create" ? createBuilding(values) : updateBuilding(values),
    onSuccess: () => {
      setMapDrawerOpen(false);
      setMode("create");
      setPolygonPath([]);
      refetch();
      globalModal.success({
        title:
          mode == "create"
            ? t("createdSuccessfully")
            : t("updatedSuccessfully"),
        subtitle:
          mode == "create"
            ? t("eventCreatedSuccessfully")
            : t("eventUpdatedSuccessfully"),
      });
    },

    onError: (error) => {
      console.log(error);
      globalModal.error(t("somethingWentWrong"), t("errorWhileCreatingEvent"));
    },
  });

  const [currentLocation, setCurrentLocation] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const [polygonPath, setPolygonPath] = useState([]);
  const [polygonVisability, setPolygonVisability] = useState([]);

  const handlePolygonComplete = (polygon) => {
    const path = polygon.getPath();
    const coordinates = [];

    path.forEach((latLng) => {
      coordinates.push([`${latLng.lat()},${latLng.lng()}`]);
    });
    setPolygonPath(coordinates);

    const fixPolygonFormat = coordinates.map((el) => {
      const latAndLng = el[0].split(",");
      return { lat: parseFloat(latAndLng[0]), lng: parseFloat(latAndLng[1]) };
    });
    setPolygonVisability(fixPolygonFormat);

    polygon.setMap(null);
  };

  const onSubmit = (values) => {
    if (values.id) {
      setMode("edit");
    }
    values.isTemporary = true;
    values.isActive = true;
    values.branchId = 1;
    values.buildingNumber = 1;
    const dynamicPolygons = values?.polygons?.map((polygon) => `[${polygon}]`);
    values.polygons = `[${dynamicPolygons.join(",")}]`;
    console.log(values);

    Mutation.mutate(values);
  };

  return (
    <div className="w-full">
      <ComplexTable
        tableTitle={t("buildings")}
        addText={t("addBuilding")}
        addFunction={() => {
          setMapDrawerOpen(true);
        }}
        columns={[
          {
            title: t("buildings"),
            dataIndex: "name",
            key: "buildings",
            sorter: true,
          },
          // {
          //   title: t("floors"),
          //   dataIndex: "roomsCount",
          //   key: "floors",
          //   sorter: true,
          // },
          {
            title: t("lastUpdate"),
            dataIndex: "updatedAt",
            key: "lastUpdate",
            sorter: true,
            render: (v, record) => {
              return dayjs(v)
                .locale(i18n.language)
                .format("HH:MM / DD MMMM YY");
            },
          },
          {
            title: t("action"),
            dataIndex: "actions",
            key: "actions",
            render: (value, record) => (
              <ActionButton
                onClick={() => {
                  setPolygonPath(record?.polygons);
                  setMapDrawerOpen(record);
                }}
              >
                <svg
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.6775 8.83333C15.935 8.83333 16.1783 8.71417 16.3358 8.51083C16.4933 8.3075 16.5483 8.0425 16.485 7.79333C16.2258 6.77917 15.6975 5.8525 14.9575 5.1125L12.0533 2.20833C10.9517 1.10667 9.48667 0.5 7.92833 0.5H4.16583C1.86917 0.5 0 2.36917 0 4.66667V16.3333C0 18.6308 1.86917 20.5 4.16667 20.5H6.66667C7.12667 20.5 7.5 20.1267 7.5 19.6667C7.5 19.2067 7.12667 18.8333 6.66667 18.8333H4.16667C2.78833 18.8333 1.66667 17.7117 1.66667 16.3333V4.66667C1.66667 3.28833 2.78833 2.16667 4.16667 2.16667H7.92917C8.065 2.16667 8.2 2.17333 8.33333 2.18583V6.33333C8.33333 7.71167 9.455 8.83333 10.8333 8.83333H15.6775ZM10 6.33333V2.71583C10.3158 2.8975 10.61 3.1225 10.875 3.3875L13.7792 6.29167C14.0408 6.55333 14.265 6.84833 14.4483 7.16667H10.8333C10.3742 7.16667 10 6.7925 10 6.33333ZM19.2683 10.3992C18.3233 9.45417 16.6767 9.45417 15.7325 10.3992L10.1433 15.9883C9.51417 16.6175 9.16667 17.455 9.16667 18.3458V19.6675C9.16667 20.1275 9.54 20.5008 10 20.5008H11.3217C12.2125 20.5008 13.0492 20.1533 13.6783 19.5242L19.2675 13.935C19.74 13.4625 20 12.835 20 12.1667C20 11.4983 19.74 10.8708 19.2683 10.3992ZM18.0892 12.7558L12.4992 18.345C12.185 18.66 11.7667 18.8333 11.3208 18.8333H10.8325V18.345C10.8325 17.9 11.0058 17.4817 11.3208 17.1667L16.9108 11.5775C17.225 11.2625 17.7742 11.2625 18.0892 11.5775C18.2467 11.7342 18.3333 11.9433 18.3333 12.1667C18.3333 12.39 18.2467 12.5983 18.0892 12.7558Z"
                    fill="#0A0F1A"
                  />
                </svg>
              </ActionButton>
            ),
          },
        ]}
        data={buildings?.data}
        loading={isPending}
        paginationConfig={{
          current: buildings?.pagination.current,
          pageSize: buildings?.pagination.pageSize,
          total: buildings?.pagination.total,
        }}
        searchFunction={(e) => {
          dispatch({ type: "search", payload: e.target.value });
        }}
        onChange={(pagination, filter, sorter, { action }) => {
          if (action === "paginate") {
            dispatch({ type: "paginate", payload: pagination });
          }
          if (action === "sort") {
            dispatch({ type: "sort", payload: sorter });
          }
        }}
        downloadFunction={() => {
          serializeAndDownload(
            buildings?.data.map((building) => ({
              [t("name")]: building.name,
              [t("roomsNo")]: building.roomsCount,
              [t("lastUpdate")]: building.updatedAt,
            })),
            "buildings"
          );
        }}
        statusList={[
          { label: t("all"), value: null },
          { label: t("active"), value: true },
          { label: t("inActive"), value: false },
        ]}
        statusFilter={(e) => {
          dispatch({ type: "status", payload: e });
        }}
        hasStatusFilter={false}
        hasAdd={user.roles?.filter(el=> el=="Administrator")[0]=="Administrator"}
      />

      <MapDrawer
        open={mapDrawerOpen}
        title={t("drawBuilding")}
        onClose={() => {
          setPolygonPath([])
          setPolygonVisability([])
          setMapDrawerOpen(false);
        }}
        footer={
          <Button
            type="primary"
            htmlType="submit"
            form="building-form"
            className="w-full rounded-xl"
          >
            {t("save")}
          </Button>
        }
        drawerContent={
          <BuildingsForm
          setPolygonVisability={setPolygonVisability}
            mapDrawerOpen={mapDrawerOpen}
            polygonPath={polygonPath}
            setPolygonPath={setPolygonPath}
            onSubmit={onSubmit}
          />
        }
      >
        <GoogleMap
          onClick={(e) => {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            setPolygonPath((oldVlue) => {
              if (oldVlue?.length > 0) {
                return [...oldVlue, [`${e.latLng.lat()},${e.latLng.lng()}`]];
              }
              return [[`${e.latLng.lat()},${e.latLng.lng()}`]];
            });
          }}
          center={currentLocation}
          zoom={12}
        >
          <MarkerF
            position={currentLocation}
            icon={{
              url: OvalsIcons,
              scaledSize: {
                width: 32,
                height: 32,
              },
            }}
          />

          <DrawingManager
            drawingMode={drawingMode}
            onPolygonComplete={handlePolygonComplete}
            options={{
              drawingControl: true,
              drawingControlOptions: {
                drawingModes: ["polygon"],
              },
              polygonOptions: {
                fillColor: "gray",
                fillOpacity: 0.4,
                strokeColor: "gray",
                strokeOpacity: 1,
                strokeWeight: 2,
                clickable: true,
                // editable:true,
                zIndex: 1,
              },
            }}
            editable
          />

          <Polygon
            paths={polygonVisability}
            options={{
              fillColor: "gray",
              fillOpacity: 0.4,
              strokeColor: "gray",
              strokeOpacity: 1,
              strokeWeight: 2,
              zIndex: 1,
            }}
          />

        </GoogleMap>
      </MapDrawer>
    </div>
  );
}
