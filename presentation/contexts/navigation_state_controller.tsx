import React, { PropsWithChildren, useState } from "react";
export const NavigationContext =
  React.createContext<NavigationContextInterface>({
    selectedVideoId: "",
    setSelectedVideoId: () => {},
    selectedVdocipher: "",
    setSelectedVdocipher: () => {},
    currentDashboardLink: "",
    setCurrentDashboardLink: () => {},
    lock: true,
    setLock: () => {},
    inviteCode: "",
    setInviteCode: () => {},
    selectedForm: "",
    setSelectedForm: () => {},
    selectedSubject: "",
    setSelectedSubject: () => {},
    userName: "",
    setUserName: () => {},
    showClassSublinks: false,
    setShowClassSublinks: () => {},
    showTcornerSublinks: false,
    setShowTcornerSublinks: () => {},
    showIcornerSublinks: false,
    setShowIcornerSublinks: () => {},
    showScornerSublinks: false,
    setShowScornerSublinks: () => {},
    continueVideo: false,
    setContinueVideo: () => {},
    showPremiumModal: false,
    setShowPremiumModal: () => {},
  });
const NavigationStateController = (props: PropsWithChildren<{}>) => {
  const [currentDashboardLink, setCurrentDashboardLink] = useState("Classes");
  const [lock, setLock] = useState(true);
  const [inviteCode, setInviteCode] = useState("");
  const [userName, setUserName] = useState("");

  //lesson state
  const [selectedForm, setSelectedForm] = useState("form 1");
  const [selectedSubject, setSelectedSubject] = useState("biology");
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [selectedVdocipher, setSelectedVdocipher] = useState("");
  const [showClassSublinks, setShowClassSublinks] = useState(true);
  const [showTcornerSublinks, setShowTcornerSublinks] = useState(false);
  const [showIcornerSublinks, setShowIcornerSublinks] = useState(false);
  const [showScornerSublinks, setShowScornerSublinks] = useState(false);

  //rememeber stated
  const [continueVideo, setContinueVideo] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  return (
    <NavigationContext.Provider
      value={{
        selectedVideoId,
        setSelectedVideoId,
        selectedVdocipher,
        setSelectedVdocipher,
        currentDashboardLink,
        setCurrentDashboardLink,
        lock,
        setLock,
        inviteCode,
        setInviteCode,
        selectedForm,
        setSelectedForm,
        selectedSubject,
        setSelectedSubject,
        userName,
        setUserName,
        showClassSublinks,
        setShowClassSublinks,
        showTcornerSublinks,
        setShowTcornerSublinks,
        showIcornerSublinks,
        setShowIcornerSublinks,
        showScornerSublinks,
        setShowScornerSublinks,
        continueVideo,
        setContinueVideo,
        showPremiumModal,
        setShowPremiumModal,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavigationStateController;

interface NavigationContextInterface {
  selectedVideoId: string;
  setSelectedVideoId: (id: string) => void;
  selectedVdocipher: string;
  setSelectedVdocipher: (id: string) => void;
  selectedForm: string;
  setSelectedForm: (id: string) => void;
  selectedSubject: string;
  setSelectedSubject: (id: string) => void;
  currentDashboardLink: string;
  setCurrentDashboardLink: (id: string) => void;
  inviteCode: string;
  setInviteCode: (id: string) => void;
  lock: boolean;
  setLock: (v: boolean) => void;
  userName: string;
  setUserName: (v: string) => void;
  showClassSublinks: boolean;
  setShowClassSublinks: (v: boolean) => void;
  showTcornerSublinks: boolean;
  setShowTcornerSublinks: (v: boolean) => void;
  showIcornerSublinks: boolean;
  setShowIcornerSublinks: (v: boolean) => void;
  showScornerSublinks: boolean;
  setShowScornerSublinks: (v: boolean) => void;
  continueVideo: boolean;
  setContinueVideo: (v: boolean) => void;
  showPremiumModal: boolean;
  setShowPremiumModal: (v: boolean) => void;
}
