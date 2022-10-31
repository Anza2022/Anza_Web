import React, { useContext, useEffect, useState } from "react";
import PastPaperModel from "../../../models/curriculum/past_paper_model";
import { NavigationContext } from "../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../presentation/contexts/past_papers_controller";
import DashboardLayout from "../../../presentation/layouts/dashboard_layout";
import {
  isBrowser,
  showToast,
} from "../../../presentation/utils/helper_functions";
import { Worker, Viewer, ScrollMode } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRouter } from "next/router";
import { IsDarkThemeContext } from "../../../presentation/contexts/app_theme_controller";
import { saveInLocalStorage } from "../../../data/services/local_storage_services";
const ViewPastPapersPage = () => {
  const { pastPapers } = useContext(PastPapersContext);
  const { selectedVideoId } = useContext(NavigationContext);
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);

  const paper: PastPaperModel = pastPapers.filter(
    (e) => e.paperId === selectedVideoId
  )[0];

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }

  const { thememode } = useContext(IsDarkThemeContext);
  const [paperPage, setPaperPage] = useState(0);
  const [msPage, setMsPage] = useState(0);

  //file loads
  const [pdffile, setPdffile] = useState(new Uint8Array());
  const [msfile, setMsfile] = useState(new Uint8Array());

  useEffect(() => {
    return () => {
      setPdffile(new Uint8Array());
    };
  }, []);

  return (
    <DashboardLayout>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
        <div className="flex-1 flex flex-col bg-gray-200  dark:bg-darksec  md:ml-44 relative py-16 w-full realtive items-center ">
          {/* <div className="flex h-12 items-center justify-center pl-5  md:pl-10 w-full">
          <div className="flex text-main font-black text-lg md:text-2xl">
            {selectedVideoId === "" ? "" : paper.title}
          </div>
        </div> */}

          {!showMarkingScheme ? (
            <div
              className="  w-full z-0"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
              }}
            >
              <Viewer
                onDocumentLoad={async (e) => {
                  if (pdffile.length < 10) {
                    let pdfdoc = await e.doc.getData();
                    setPdffile(pdfdoc);
                  }
                }}
                fileUrl={
                  pdffile.length > 10
                    ? pdffile
                    : paper == undefined
                    ? ""
                    : paper.paperUrl
                }
                theme={thememode == "light" ? "" : "dark"}
                initialPage={paperPage}
                onPageChange={(e) => {
                  setPaperPage(e.currentPage);
                }}
              />
            </div>
          ) : (
            <div
              className="  w-full z-0"
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "750px",
              }}
            >
              <Viewer
                fileUrl={
                  msfile.length > 10
                    ? msfile
                    : paper == undefined
                    ? ""
                    : paper.markingSchemeUrl
                }
                theme={thememode == "light" ? "" : "dark"}
                onDocumentLoad={async (e) => {
                  if (msfile.length < 10) {
                    let pdfdoc = await e.doc.getData();
                    setMsfile(pdfdoc);
                  }
                }}
                // fileUrl={
                //   "https://cdn.syncfusion.com/content/PDFViewer/flutter-succinctly.pdf"
                // }
                // scrollMode={ScrollMode.Horizontal}
                initialPage={msPage}
                onPageChange={(e) => {
                  setMsPage(e.currentPage);
                }}
              />
            </div>
          )}

          <div
            className={`fixed bottom-3 md:left-60 md:bottom-5 left-2 flex space-x-5 ${
              paper == undefined || paper.markingSchemeUrl == "" ? "hidden" : ""
            }`}
          >
            <div
              onClick={() => {
                setShowMarkingScheme(!showMarkingScheme);
              }}
              className="flex px-4 py-1 text-white bg-main cursor-pointer rounded-md"
            >
              {showMarkingScheme ? "Paper" : "Marking Scheme"}
            </div>
          </div>
          {/* <div className={`fixed right-20  top-24 flex`}>
            <div
              onClick={() => {
                if (isBrowser()) {
                  window.print();
                }
              }}
              className="flex px-4 py-1 text-white bg-main cursor-pointer rounded-md"
            >
              Print Paper
            </div>
          </div> */}
        </div>
      </Worker>
    </DashboardLayout>
  );
};

export default ViewPastPapersPage;
