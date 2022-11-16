import React, { useContext, useEffect, useState } from "react";

import { Worker, Viewer, ScrollMode } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useRouter } from "next/router";
import PastPaperModel from "../../../../models/curriculum/past_paper_model";
import { IsDarkThemeContext } from "../../../../presentation/contexts/app_theme_controller";
import { NavigationContext } from "../../../../presentation/contexts/navigation_state_controller";
import { PastPapersContext } from "../../../../presentation/contexts/past_papers_controller";
import DashboardLayout from "../../../../presentation/layouts/dashboard_layout";
import { TeachersAccountContext } from "../../../../presentation/contexts/teachers_account_context";

const ViewPastPapersPage = () => {
  const { myPastPapers } = useContext(TeachersAccountContext);
  const { selectedVideoId } = useContext(NavigationContext);
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);

  const paper: PastPaperModel = myPastPapers.filter(
    (e) => e.paperId === selectedVideoId
  )[0];

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: any) {
    setNumPages(numPages);
  }
  const router = useRouter();

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
                    : `https://anzaacademy.co/anzaapi/view_past_paper${paper.paperUrl.split("/view_past_paper")[1]}`
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
                    : `https://anzaacademy.co/anzaapi/view_past_paper${paper.markingSchemeUrl.split("/view_past_paper")[1]}`
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
            className={`fixed bottom-3 md:left-52 md:bottom-5 left-2 flex space-x-5 ${
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
        </div>
      </Worker>
    </DashboardLayout>
  );
};

export default ViewPastPapersPage;
