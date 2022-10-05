import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import GlobalFonts from "../fonts/fonts.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Container from "../styles/Container";
import EventInfo from "../components/EventInfo";
import Month from "../styles/Month.js";
import Events from "../styles/Events.js";

let summerVacation = 0;
let winterVacation = 0;

const Event = ({ currentYear, currentMonth }) => {
	const [events, setEvents] = useState([]);
	const [month, setMonth] = useState(parseInt(currentMonth));
	const [year, setYear] = useState(parseInt(currentYear));

	const nextMonth = () => {
		setMonth(month + 1);
		if (month >= 12) {
			setYear(year + 1);
			setMonth(1);
		}
	};

	const prevMonth = () => {
		summerVacation = 0;
		setMonth(month - 1);
		if (month === 1) {
			setYear(parseInt(currentYear));
			setMonth(12);
		}
	};

	const event = [];
	const eventNames = [];
	let i = 0;
	const getEvents = () => {
		const KEY = "3945dd1428d94d0cb836e00bd0a5480d";
		const URL = `https://open.neis.go.kr/hub/SchoolSchedule?Key=${KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150658&AA_YMD=${year}${String(
			month
		).padStart(2, "0")}`;
		axios.get(URL).then((res) => {
			const datas = res.data.SchoolSchedule[1].row;
			for (let data of datas) {
				const eventDate = data.AA_YMD;
				const eventName = data.EVENT_NM;
				const eventDateYear = eventDate.substring(0, 4);
				const eventDateMonth = eventDate.substring(4, 6);
				const eventDateDay = eventDate.substring(6, 8);
				const currentEventDate = `${eventDateYear}-${eventDateMonth}-${eventDateDay}`;
				const eventDay = new Date(currentEventDate).getDay();

				if (eventDay >= 1 && eventDay <= 5) {
					if (eventNames.indexOf(eventName) < 0) {
						event[i] = { name: `${eventName}`, date: `${eventDate}` };
						eventNames[i] = `${eventName}`;
					}
					i += 1;
				}
			}
			setEvents(event);
		});
	};

	useEffect(() => {
		getEvents();
	}, [month]);

	return (
		<Container>
			<GlobalFonts />
			<Month>{month}월</Month>
			<div style={{ position: "relative" }}>
				<PrevBtn onClick={prevMonth} count={month}>
					<FontAwesomeIcon
						icon={faPlay}
						style={{ width: "100%", height: "100%", transform: "scaleX(-1)" }}
					/>
				</PrevBtn>
				<NextBtn onClick={nextMonth} count={month}>
					<FontAwesomeIcon
						icon={faPlay}
						style={{ width: "100%", height: "100%" }}
					/>
				</NextBtn>
				<Events>
					{events.map((event, index) => (
						<EventInfo
							key={index}
							name={event.name}
							day={parseInt(event.date.substring(6, 8))}
						/>
					))}
					<EventStatus eventCount={events.length}>
						학교 일정이 존재하지 않습니다.
					</EventStatus>
				</Events>
			</div>
		</Container>
	);
};

const NextBtn = styled.div`
	width: 70px;
	height: 70px;
	position: absolute;
	top: 50%;
	right: 3%;
	transform: translateY(-50%);
	display: ${(props) => (props.count === 2 ? "none" : "block")};
`;

const PrevBtn = styled(NextBtn)`
	left: 3%;
	display: ${(props) => (props.count === 3 ? "none" : "block")};
`;

const EventStatus = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 40px;
	font-family: "GothicA1-Regular";
	display: ${(props) => (props.eventCount !== 0 ? "none" : "block")};
`;

export default Event;
