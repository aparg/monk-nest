import Link from "next/link";

export default function FixedContact() {
  return (
    <div className="floating fixcontact2">
      <div
        className="alert alert-success bg-lightyellow2 alert-dismissible fade show mt-2 mb-0 rounded-3 d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row justify-content-start align-items-start gap-3 shadow-lg"
        role="alert"
      >
        <div>
          <div className="my-2 my-sm-0 d-flex text-dark align-items-center gap-2">
            <img
              src="/COA-agent-pic.jpg"
              alt="agent pic"
              className="img-fluid img-call-height-dropdown"
            />
            <div className="d-flex flex-column justify-content-start align-items-start">
              <p className="mb-0 fw-bold">
                Looking for New Construction Homes ?
              </p>
              <p className="fs-small mb-0">
                Call us at
                <Link href={"telto:(587) 887-2572"} className="me-2 ms-1">
                  (587) 887-2572
                </Link>
                to speak with our friendly new homes advisor.
              </p>
            </div>
          </div>
        </div>
        {/* <Link
          className="btn btn-white link-black"
          href={"/pre-construction-homes/"}
        >
          Explore all projects
          <i className="bi bi-arrow-right-short"></i>
        </Link> */}
      </div>
    </div>
  );
}
