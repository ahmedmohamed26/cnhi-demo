import { Form, Select } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useBuildings } from "../../../services/buildingsv2.js";
import {
  useAuthorities,
  useCompanies,
  useFloors,
  useRooms,
} from "../../../services/headquarter.js";

export default function AddMyOfficeData({ onClose }) {
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();
  const { data: buildings } = useBuildings();
  const buildingOptions = buildings?.data?.map((el) => {
    return {
      value: `${el.id},${el.nameAr},${el.nameEn}`,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const { data: floors } = useFloors();
  const floorsOptions = floors?.data?.map((el) => {
    return {
      value: `${el.id},${el.nameAr},${el.nameEn}`,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const { data: companies } = useCompanies();
  const companiesOptions = companies?.data?.map((el) => {
    return {
      value: `${el.id},${el.nameAr},${el.nameEn}`,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const { data: authorities } = useAuthorities();
  const authoritiesOptions = authorities?.data?.map((el) => {
    return {
      value: `${el.id},${el.nameAr},${el.nameEn}`,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });
  const { data: rooms } = useRooms();
  const roomsOptions = rooms?.data?.map((el) => {
    return {
      value: `${el.id},${el.nameAr},${el.nameEn}`,
      label: i18n.language == "ar" ? el.nameAr : el.nameEn,
    };
  });

  return (
    <>
      <Form
        form={form}
        onFinish={(values) => {
          localStorage.setItem("myRoom", JSON.stringify(values));
          onClose();
        }}
        id="room-form"
        className="flex flex-col"
        layout="vertical"
      >
        <Form.Item label={t("building")} name={"buildingId"}>
          <Select
            options={buildingOptions}
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#3E7D91"
                />
              </svg>
            }
            placeholder={t("building")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("floor")} name={"floorId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#3E7D91"
                />
              </svg>
            }
            options={floorsOptions}
            placeholder={t("floor")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("company")} name={"companyId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#3E7D91"
                />
              </svg>
            }
            options={companiesOptions}
            placeholder={t("company")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("authority")} name={"sideId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#3E7D91"
                />
              </svg>
            }
            options={authoritiesOptions}
            placeholder={t("authority")}
          ></Select>
        </Form.Item>

        <Form.Item label={t("office_rooms")} name={"roomId"}>
          <Select
            suffixIcon={
              <svg
                width="11"
                height="6"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.59168 4.16613C6.51421 4.24424 6.42204 4.30623 6.32049 4.34854C6.21894 4.39085 6.11002 4.41263 6.00001 4.41263C5.89 4.41263 5.78108 4.39085 5.67953 4.34854C5.57798 4.30623 5.48581 4.24424 5.40834 4.16613L1.59168 0.341133C1.51421 0.263025 1.42204 0.20103 1.32049 0.158722C1.21894 0.116415 1.11002 0.094634 1.00001 0.094634C0.889999 0.094634 0.781078 0.116415 0.679528 0.158722C0.577979 0.20103 0.485812 0.263025 0.408342 0.341133C0.253133 0.497268 0.166015 0.708477 0.166015 0.928632C0.166015 1.14879 0.253133 1.36 0.408342 1.51613L4.23334 5.34113C4.70209 5.8093 5.33751 6.07227 6.00001 6.07227C6.66251 6.07227 7.29792 5.8093 7.76668 5.34113L11.5917 1.51613C11.7456 1.36091 11.8324 1.15142 11.8333 0.932799C11.834 0.823127 11.813 0.714407 11.7715 0.612876C11.73 0.511345 11.6689 0.418999 11.5917 0.341132C11.5142 0.263025 11.422 0.201029 11.3205 0.158722C11.2189 0.116415 11.11 0.0946336 11 0.0946336C10.89 0.0946336 10.7811 0.116415 10.6795 0.158722C10.578 0.201029 10.4858 0.263025 10.4083 0.341132L6.59168 4.16613Z"
                  fill="#3E7D91"
                />
              </svg>
            }
            options={roomsOptions}
            placeholder={t("office_rooms")}
          ></Select>
        </Form.Item>
      </Form>
    </>
  );
}
