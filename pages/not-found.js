import Link from "next/link";
export default function Error404() {
  return (
    <>
      {/* error-section */}
      <section className="error-section centred">
        <div className="scroll-text">
          <div className="text-box-one">
            <div className="text-inner text-one">
              {Array.from({ length: 27 }, (_, i) => (
                <h3 key={`text-one-${i}`}>Page Not Found</h3>
              ))}
            </div>
          </div>
          <div className="text-box-two">
            <div className="text-inner text-two">
              {Array.from({ length: 27 }, (_, i) => (
                <h3 key={`text-two-${i}`}>Page Not Found</h3>
              ))}
            </div>
          </div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <div className="image-box">
              <figure className="error-image">
                <img src="/assets/images/icons/error-1.png" alt="Error" />
              </figure>
            </div>
            <h2>Something Went Wrong, Try Later</h2>
            <p>
              Try refining your search or use the navigation below to <br />
              return to the main home page.
            </p>
            <div className="btn-box">
              <Link href="/" className="theme-btn btn-two">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* error-section end */}
    </>
  );
}
