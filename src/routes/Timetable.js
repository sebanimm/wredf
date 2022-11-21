import { React, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactDropdown from "react-dropdown";
import "react-dropdown/style.css";
import Container from "../styles/Container";
import GlobalFonts from "../fonts/fonts.js";
import Dates from "../styles/Dates";

const A = styled.div`
	width: 680px;
	height: 500px;
	background-color: #98adc7;
	border-radius: 20px;
	margin-top: 20px;
`;

const B = styled.div``;

const TimetableWrapper = styled.div`
	width: 1000px;
	height: 100vh;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0 auto;

	.z {
		height: 100vh;
		width: 100px;
		color: white;
	}

	.z > .dropdown {
		padding-top: 50px;
		font-family: "Ultra";
	}

	.a {
		display: flex;
	}

	.s {
		margin-top: 78.4px;
		width: 100px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		font-size: 24px;
		color: rgb(31, 61, 96);
		p {
			font-family: "Ultra";
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.Dropdown-option,
	.Dropdown-control,
	.Dropdown-menu {
		color: white;
		background-color: #6d839e;
		border: 1px solid #6d839e;
	}
	.Dropdown-control {
		border-radius: 6px;
	}
	.Dropdown-menu {
		margin-top: 2px;
		border-radius: 6px;
		border: 1px solid;
	}
	.Dropdown-arrow {
		border-color: black transparent transparent;
	}

	.is-open .Dropdown-arrow {
		border-color: transparent transparent black;
	}
`;

const Timetable = () => {
	const [grade, setGrade] = useState(1);
	const [className, setClassName] = useState(4);

	const [a, b] = useState([]);
	const KEY = `3945dd1428d94d0cb836e00bd0a5480d`;
	const URL = `https://open.neis.go.kr/hub/hisTimetable?Key=${KEY}&Type=json&pIndex=1&pSize=300&ATPT_OFCDC_SC_CODE=C10&SD_SCHUL_CODE=7150658&GRADE=${grade}&CLASS_NM=${className}&TI_FROM_YMD=20221114&TI_TO_YMD=20221118`;
	const regex = /(\[\S{0,3}\])/gi;
	axios.get(URL).then((res) => {
		const datas = res.data.hisTimetable[1].row;
		for (let data of datas) {
			const scheduleInfo = data.ITRT_CNTNT.replace(regex, "").replace(
				"자율활동",
				"동아리"
			);
			a.push(scheduleInfo);
		}
	});

	const options = [
		{ value: "1-1", label: "1-1" },
		{ value: "1-2", label: "1-2" },
		{ value: "1-3", label: "1-3" },
		{ value: "1-4", label: "1-4" },
		{ value: "2-1", label: "2-1" },
		{ value: "2-2", label: "2-2" },
		{ value: "2-3", label: "2-3" },
		{ value: "2-4", label: "2-4" },
		{ value: "3-1", label: "3-1" },
		{ value: "3-2", label: "3-2" },
		{ value: "3-3", label: "3-3" },
		{ value: "3-4", label: "3-4" },
	];
	const defaultOption = options[grade * grade + className - 2];

	return (
		<Container>
			<GlobalFonts />
			<TimetableWrapper>
				<div className="a">
					<div className="s">
						<p>1</p>
						<p>2</p>
						<p>3</p>
						<p>4</p>
						<p>5</p>
						<p>6</p>
						<p>7</p>
						<p>8-9</p>
						<p>10-11</p>
					</div>
					<div>
						<Dates
							style={{ width: "100%", fontSize: "30px", color: "#1F3D60" }}
						>
							<p>Mon</p>
							<p>Tue</p>
							<p>Wed</p>
							<p>Thu</p>
							<p>Fri</p>
						</Dates>
						<A>
							{a.map((data) => (
								<B>{data}</B>
							))}
						</A>
					</div>
				</div>
				<div className="z">
					<ReactDropdown
						className="dropdown"
						options={options}
						value={defaultOption}
						placeholder="선택해주세요."
					/>
				</div>
			</TimetableWrapper>
		</Container>
	);
};

export default Timetable;
