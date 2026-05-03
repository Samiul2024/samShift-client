import React from "react";

const DeveloperFooter = () => {

    return (

        <footer
            className="
      w-full
      border-t
      border-slate-800
      bg-slate-950
      py-5
      mt-10
      "
        >

            <div
                className="
        max-w-7xl
        mx-auto
        px-6
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-3
        text-sm
        "
            >

                {/* LEFT */}
                <p className="text-slate-500">

                    © {new Date().getFullYear()}
                    {" "}
                    All rights reserved.

                </p>



                {/* CENTER */}
                <div
                    className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-2
          text-slate-500
          "
                >

                    <span>
                        Developed by
                    </span>

                    <a
                        href="https://mdsamiullahossen.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="
            text-blue-400
            hover:text-blue-300
            font-semibold
            transition
            "
                    >
                        MD. Samiulla Hossen
                    </a>

                </div>



                {/* RIGHT */}
                <p className="text-slate-600">

                    MERN Stack Developer

                </p>

            </div>

        </footer>
    );
};

export default DeveloperFooter;