import CondoCard from "@/components/PreconPropertyCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import { fetchBlogPostByCity } from "@/api/blogs";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import EventBanner from "@/components/Banner";

async function getData(city) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-city/" +
      city +
      "?page_size=200",
    {
      next: { revalidate: 10 },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

async function getCities() {
  const res = await fetch("https://api.dolphy.ca/api/all-city", {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CapitalizeFirst = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1);
};

const retImage = (data) => {
  if (data.length > 0) {
    if (data[0].image.length > 0 && data[0].image[0].image) {
      return `https://api.dolphy.ca${data[0].image[0].image}`;
    }
  } else {
    return "/social/gta.webp";
  }
};

export async function generateMetadata({ params }, parent) {
  let city = CapitalizeFirst(params.city);
  const data = await getData(params.city);
  return {
    ...parent,
    alternates: {
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/`,
    },
    title: data.preconstructions.length + " Preconstruction Homes in " + city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} pre construction TownHomes, Detached & Condos. Check out ${data.preconstructions.length}+ new construction homes on Monk Nest. Floor plans & pricing updated for new construction homes in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  const blogPosts = await fetchBlogPostByCity(params?.city);

  const filteredprojects = (value) => {
    return data.preconstructions.filter((item) => item.status == value);
  };

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-4 position-relative">
        <div className="container-fluid">
          <div className="pb-0">
            <h1 className="main-title mw text-center text-md-start fs-mine mb-0">
              {`${
                data.preconstructions.length
              }+ Active Pre Construction & New Homes in ${CapitalizeFirst(
                params.city
              )} ( Selling Now )`}
            </h1>
            <p className="text-dark text-center text-md-start mb-2">
              {`${data.preconstructions.length}+ New Pre construction Detached,
              Townhomes and Condos for sale in ${CapitalizeFirst(
                params.city
              )} (Updated ${
                new Date().getMonth() +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
              })`}
            </p>
          </div>
          <div className="d-flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/condos/`}
              >
                New Condos {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
          <EventBanner></EventBanner>
          {/* <div className="d-flex overflow-hidden">
            <Link href={"/"} className="btn btn-light link-black me-2 mb-3">
              Home
            </Link>
            {cities &&
              cities.map((item) => (
                <Link
                  href={"/pre-construction-homes/" + item.slug}
                  className="btn btn-light link-black me-2 mb-3"
                >
                  {item.name}
                </Link>
              ))}
          </div> */}
        </div>
        <div className="container-fluid">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {data.preconstructions &&
              filteredprojects("Selling").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4">
            {filteredprojects("Upcoming").length > 0 ? (
              `Launching Soon - New Construction Projects in ${CapitalizeFirst(
                data.city.name
              )}`
            ) : (
              <></>
            )}
          </h2>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {data.preconstructions &&
              filteredprojects("Planning Phase").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
            {data.preconstructions &&
              filteredprojects("Upcoming").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5"></div>
          <h2 className="fw-bold fs-3 mb-4 text-red">
            {filteredprojects("Sold out").length > 0 ? (
              <i>{`Past Communities in ${CapitalizeFirst(
                data.city.name
              )} - Sold out`}</i>
            ) : (
              <></>
            )}
          </h2>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 gy-4 gx-3 gx-lg-2">
            {data.preconstructions &&
              filteredprojects("Sold out").map((item, no) => (
                <div className="col" key={item.id}>
                  <script
                    key={item.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                      __html: JSON.stringify(PreconSchema(item)),
                    }}
                  />
                  <CondoCard {...item} no={no} />
                </div>
              ))}
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="mb-5">
            <h3 className="fs-2">
              <strong>The Monk Nest Insights</strong> - Know Whats Happening in{" "}
              {CapitalizeFirst(data.city.name)}
            </h3>
            <p>
              Learn about the new projects, news and insights and current new
              trends happening in {CapitalizeFirst(data.city.name)}
            </p>
          </div>
          <div className="row row-cols-lg-5">
            {blogPosts.length > 0 ? (
              <>
                {blogPosts.map((blog, index) => {
                  return (
                    <div className="col-12 mb-4" key={index}>
                      <BlogCard blog={blog} />
                    </div>
                  );
                })}
              </>
            ) : (
              <div>
                <p className="fs-2 text-center fw-bold text-secondary">
                  No blog post found
                </p>
              </div>
            )}
          </div>
          <div className="py-5 my-5" id="mycontact">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <img
                  src="/contact-bottom-2.png"
                  alt="dce"
                  className="img-fluid w-25 w-smm-50 mb-3"
                />
              </div>
              <h2 className="fw-mine text-center px-md-4 fs-4">
                Contact Monk Nest Team Today
              </h2>
              <div className="row row-cols-1 row-cols-md-3 mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <BottomContactForm
                    proj_name="City Page"
                    city={data.city.name}
                  ></BottomContactForm>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
          </div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="pt-5 mt-5"></div>
          <div className="d-flex justify-content-center">
            <div className="py-5 max-w-mine">
              {data.city && (
                <div className="container" id="make-img-responsive">
                  <div className="row row-cols-1">
                    <div
                      className="col-12 mt-mine px-3"
                      dangerouslySetInnerHTML={{
                        __html: data.city.details,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
