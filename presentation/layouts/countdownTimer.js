import React, {
    useEffect,
    useState,
} from "react";

function CountdownTimer() {


    const [expiryTime, setExpiryTime] = useState("21 nov 2022 15:30:25");
    const [countdownTime, setCountdownTime] = useState(
        {
            countdownDays: '',
            countdownHours: '',
            countdownlMinutes: '',
            countdownSeconds: ''
        }
    );

    const countdownTimer = () => {

        const timeInterval = setInterval(() => {

            const countdownDateTime = new Date(expiryTime).getTime();
            const currentTime = new Date().getTime();
            const remainingDayTime = countdownDateTime - currentTime;
            const totalDays = Math.floor(remainingDayTime / (1000 * 60 * 60 * 24));
            const totalHours = Math.floor((remainingDayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const totalMinutes = Math.floor((remainingDayTime % (1000 * 60 * 60)) / (1000 * 60));
            const totalSeconds = Math.floor((remainingDayTime % (1000 * 60)) / 1000);

            const runningCountdownTime = {
                countdownDays: totalDays,
                countdownHours: totalHours,
                countdownMinutes: totalMinutes,
                countdownSeconds: totalSeconds
            }

            setCountdownTime(runningCountdownTime);

            if (remainingDayTime < 0) {
                clearInterval(timeInterval);
                setExpiryTime(false);
            }

        }, 1000);
    }

    useEffect(() => {
        countdownTimer();
    });

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="btn-group my-3">
                    {expiryTime !== false ?
                        <>
                            {/* <button type="button" className="btn btn-outline-success">{countdownTime.countdownDays} <sub>Days</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownHours} <sub>Hours</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownMinutes} <sub>Minutes</sub></button>
                            <button type="button" className="btn btn-success">:</button>
                            <button type="button" className="btn btn-outline-success">{countdownTime.countdownSeconds} <sub>Seconds</sub></button> */}

                            <div className="grid grid-flow-col gap-0 text-center auto-cols-max" >
                                <div className="flex flex-col p-0 bg-neutral rounded-box text-neutral-content">
                                    <span className="countdown font-mono text-5xl">
                                        <span>{countdownTime.countdownDays} <sub className="text-xs -ml-5 mr-2">Days</sub></span>
                                    </span>


                                </div>
                                <div className="flex flex-col p-0 bg-neutral rounded-box text-neutral-content">
                                    <span className="countdown font-mono text-5xl">
                                        <span >{countdownTime.countdownHours} <sub className="text-xs -ml-5 mr-2">Hrs</sub></span>
                                    </span>

                                </div>
                                <div className="flex flex-col  bg-neutral rounded-box text-neutral-content">
                                    <span className="countdown font-mono text-5xl">
                                        <span>{countdownTime.countdownMinutes} <sub className="text-xs -ml-5 mr-2">Min</sub></span>
                                    </span>

                                </div>
                                <div className="flex flex-col  bg-neutral rounded-box text-neutral-content">
                                    <span className="countdown font-mono text-5xl">
                                        <span>{countdownTime.countdownSeconds}<sub className="text-xs -ml-0 mr-4">Sec</sub></span>
                                    </span>

                                </div>
                            </div>

                        </>

                        : <p style={{ fontFamily: "Overpass", fontWeight: 500 }}>Launching has passed!</p>}
                </div>
                <h4 className="text-center text-primary" style={{ fontFamily: "Overpass", fontWeight: 500 }}>...to Launch🎉🎉🎊</h4>
            </div>
        </div>
    )

}
export default CountdownTimer;