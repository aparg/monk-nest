import Link from "next/link";

const Footer = ({ cities }) => {
  return (
    <footer className="footer mt-5 shadow-lg">
      <div className="container-fluid footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="footer-logo d-flex align-items-center">
              <img src="/logo2.svg" alt="Dolphy logo" className="img-fluid" />
            </Link>
            <p></p>
            <p>
              Dolphy.ca provides up-to-date information on over 1,000 pre
              construction homes across Canada, including detached,
              semi-detached, townhomes and condominiums. Prices, sizes,
              offerings and promotions are set by builders and subject to change
              without notice. Dolphy.ca content is for reference only. We do not
              guarantee accuracy of third-party information.
            </p>
            <div className="social-links d-flex mt-4">
              <Link href="#" className="me-2" target="_blank">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="#" className="me-2" target="_blank">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link
                href="https://www.instagram.com/dolphy_ca/"
                className="me-2"
                target="_blank"
              >
                <i className="bi bi-instagram"></i>
              </Link>
              <Link
                href="https://www.tiktok.com/@dolphy.ca"
                className="me-2"
                target="_blank"
              >
                <i className="bi bi-tiktok"></i>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-6 footer-links">
            <h4>Popular Cities in Dolphy</h4>
            <ul className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {cities &&
                cities.map((city) => (
                  <li key={city.id} className="footerlinks">
                    <Link href={`/pre-construction-homes/${city.slug}`}>
                      <span>{city.name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-start text-md-start">
            <h4>Contact Dolphy</h4>
            <p className="mb-1">Dolphy Inc.</p>
            <p className="mb-1">
              8300 Woodbine Ave ste 500,Markham, ON L3R 9Y7
            </p>
            <p className="mb-1">Office Hours ⋅ 9AM - 6 PM</p>
            <p className="mt-1 mb-1">
              <strong>Phone: </strong>
              <Link href="tel:(587) 887-2572" className="text-dark">
                (587) 887-2572
              </Link>
            </p>
            <p>
              <strong>Email: </strong>
              <Link href="mailto:hello@dolphy.ca" className="text-dark">
                hello@dolphy.ca
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-start text-md-center mt-4">
        <p>
          ©2023 <span>Copyright</span>{" "}
          <strong className="px-1">Dolphy Inc.</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
