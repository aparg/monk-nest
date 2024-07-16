import CondoCard from "@/components/CondoCard";
import BottomContactForm from "@/components/BottomContactForm";
import { notFound } from "next/navigation";
import DolphyAdvantage from "@/components/DolphyAdvantage";
import PreconSchema from "@/components/PreconSchema";
import FixedContactButton from "@/components/FixedContactButton";
import { fetchBlogPostByCity } from "@/api/blogs";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import EventBanner from "@/components/Banner";
import { format } from "date-fns";

async function getData(city) {
  const res = await fetch(
    "https://api.dolphy.ca/api/preconstructions-city/" +
      city +
      "?project_type=Condo&page_size=200",
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
      canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/condos/`,
    },
    title: data.preconstructions.length + " Preconstruction Condos in " + city,
    openGraph: {
      images: retImage(data.preconstructions),
    },
    description: `${city} upcoming pre construction Condos. Check out ${data.preconstructions.length}+ new construction condos on Dolphy. Floor plans & pricing updated for upcoming new construction condos in ${city}`,
  };
}

export default async function Home({ params }) {
  const data = await getData(params.city);
  const blogPosts = await fetchBlogPostByCity(params?.city);
  let cities = await getCities();

  return (
    <>
      <FixedContactButton></FixedContactButton>
      <div className="pt-4 position-relative">
        <div className="container-fluid">
          <div className="pb-0">
            <h1 className="main-title text-center text-md-start fs-mine mb-0">
              {`${
                data.preconstructions.length
              }+ Active  New Construction Condos in ${CapitalizeFirst(
                params.city
              )} ( Selling Now )`}
            </h1>
            <p className="text-dark text-center text-md-start mb-2">
              {`${
                data.preconstructions.length
              } Pre construction Condos in ${CapitalizeFirst(
                params.city
              )} (Updated ${
                new Date().getMonth() +
                1 +
                "-" +
                new Date().getDate() +
                "-" +
                new Date().getFullYear()
              } ${format(new Date(), "MMM")})`}
            </p>
          </div>
          <div className="d-flex mb-4 mt-0 gap-2 overflow-hidden">
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/`}
              >
                All Projects in {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/upcoming/`}
              >
                Upcoming Projects in {CapitalizeFirst(params.city)}
              </Link>
            </div>
            <div>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/townhomes/`}
              >
                New Townhomes {CapitalizeFirst(params.city)}
              </Link>
              <Link
                className="link-black badge py-2 bg-white shadow-sm text-dark fs-small fw-m"
                href={`/pre-construction-homes/${params.city}/detached/`}
              >
                New Detached Homes {CapitalizeFirst(params.city)}
              </Link>
            </div>
          </div>
        </div>
        <EventBanner></EventBanner>
        <div className="container-fluid">
          <div className="py-2"></div>
          <div className="row row-cols-1 row-cols-md-4 row-cols-lg-5 gy-4 gx-3 gx-lg-2">
            {data.preconstructions &&
              data.preconstructions.map((item, no) => (
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
          <DolphyAdvantage></DolphyAdvantage>
          <div className="pt-5 mt-5"></div>
          <div className="mb-5">
            <h3 className="fs-2">
              <strong>The Dolphy Insights</strong> - Know Whats Happening in{" "}
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
                Contact Dolphy Team Today
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
