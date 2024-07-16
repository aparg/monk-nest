"use client";
import Link from "next/link";
import React from "react";
import TimeAgo from '../TimeAgo'
import { resenditial } from '@/api/routes'

//ICONS
import { IoBedOutline } from 'react-icons/io5'
import { LuBath } from 'react-icons/lu'

const ResoCard = ({ curElem, city }) => {
  const price = Number(curElem.ListPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  }
  const imgSrc = resenditial.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched]
  })

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = `/noimage.webp`
  }

  return (
    <>
      <div className="col">
        <Link
          href={`/ontario/${city}/${curElem.MLS}`}
          className="text-decoration-none text-dark"
        >
          <div className="afte-proj">
            <div className="d-flex gap-5">
              <div className="img-text ">
                <p className="m-0 ">
                  <TimeAgo modificationTimestamp={curElem.TimestampSql} />
                </p>
              </div>
              <div className="img-text-propertytype ">
                <p className="m-0 "> {curElem.TypeOwn1Out}</p>
              </div>
            </div>

            <img
              src={imgSrc}
              className="imghei"
              alt={curElem.MLS}
              onError={handleImageError}
            />

            <div className="card-textt card">
              <p className="mb-0 card-price">{price}</p>
              {/* <p className="mb-0 tet-s d-flex">
                <span className="">
                  <IoBedOutline />{" "}
                  {curElem.Bedrooms} Bed
                </span>
                <span className="px-4">
                  <LuBath />{" "}
                  {curElem.Washrooms} Bath
                </span>
                <span className="">
                  <LuRuler />{" "}
                  {curElem.ApproxSquareFootage} Sqft
                </span>
              </p> */}
              <p className="mb-0 text-s d-flex j align-items-center">
                <IoBedOutline />
                <span className="d-flex justify-content-between align-items-center ps-2 pe-4">
                  {curElem.Bedrooms} BED
                </span>{' '}
                <LuBath />
                <span className="d-flex justify-content-between align-items-center ps-2 pe-4">
                  {' '}
                  {curElem.Washrooms} BATH{' '}
                </span>
              </p>
              <p className="mb-0 text-s">
                {curElem.Street} {curElem.StreetName}{' '}
                {curElem.StreetAbbreviation} {curElem.Municipality},{' '}
                {curElem.Province}{' '}
              </p>
              <p className="mb-0 text-s"> MLS® #{curElem.MLS}</p>
              <p className="mb-0 text-s"> Listed by {curElem.ListBrokerage}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default ResoCard;
