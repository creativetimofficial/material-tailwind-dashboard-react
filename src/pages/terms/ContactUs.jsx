import { useLang } from "../../hooks/LangContext";
import { useEffect, useState } from "react";
import { useExpand } from "../../hooks/ExpandSide";
import Auth from "@/api/Auth.api";
import { useSnackbar } from "../../hooks/SnackBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/Auth";
import PropTypes from "prop-types";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Avatar,
	Chip,
	Tooltip,
	Progress,
	Input,
	Checkbox,
	Button,
	Textarea,
} from "@material-tailwind/react";
import { LoaderCircle } from "lucide-react";
import PageNumbers from "@/components/pageNumbers";
export default function ContactUs() {
	const [search, setSearch] = useState(null);
	const { openSnackbar } = useSnackbar();
	const { auth, account } = useAuth();
	const [adminMessages, setAdminMessages] = useState([]);
	const [contactUs, setContactUs] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		message: "",
	});
	const [loading, setLoading] = useState(false);
	const [limit, setLimit] = useState(20);
	const [page, setPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState(1);
	const nav = useNavigate();
	useEffect(() => {
		console.log(contactUs);
	}, [contactUs]);
	const handleContactUsChange = (e) => {
		const { name, value } = e.target;

		setContactUs((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const next = (num) => {
		if (num) {
			setPage(num)
			return
		}
		if (page + 1 > pagesNumber) return
		setPage(page + 1)
	}

	const prev = () => {
		if (page - 1 <= 0) return
		setPage(page - 1)
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		Auth.contactUs(contactUs, auth)
			.then(() => {
				openSnackbar("Message Sent Successfully", {
					type: "success",
					duration: 3000,
				});
				setLoading(false);
				nav("/home");
			})
			.catch((err) => {
				setLoading(false);
				openSnackbar(err.response.data.msg, {
					type: "error",
					duration: 4000,
				});
			});
	};

	useEffect(() => {
		if (account.role === "admin") {
			setLoading(true);
			Auth.getContactUs(auth, limit, page)
				.then((res) => {
					setLoading(false);
					setPagesNumber(res.data.totalPages);
					setAdminMessages(res.data.issues);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
				});
		}
	}, [page]);

	const { lang } = useLang();
	return (
		<div
			className={`duration-300 flex flex-col gap-20 justify-center`}
		>
			<section className="w-full [&>section]:flex-col [&>section]:gap-14 [&>section]:flex flex flex-col gap-20 p-10">
				{/* <SearchField search={search} setSearch={setSearch} /> */}

				{/* <section>
					<HeadersText ar="تواصل معنا" en="Contact us" />
				</section> */}
				{account.role !== "admin" && (
					<form
						onSubmit={handleSubmit}
						className="mt-8 mb-2  max-w-screen w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto"
					>
						<div className="flex flex-col items-start justify-start gap-5">
							<Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
								First Name
							</Typography>
							<Input
								size="lg"
								type="text"
								required
								placeholder="John"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								name="firstName"
								onChange={handleContactUsChange}
							/>
						</div>
						<div className="flex flex-col items-start justify-start gap-5">
							<Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
								Last Name
							</Typography>
							<Input
								size="lg"
								type="text"
								required
								placeholder="Doe"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								name="lastName"
								onChange={handleContactUsChange}
							/>
						</div>

						<div className="flex flex-col items-start justify-start gap-5">
							<Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
								Email
							</Typography>
							<Input
								size="lg"
								type="email"
								required
								placeholder="name@mail.com"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								name="email"
								onChange={handleContactUsChange}
							/>
						</div>
						<div className="flex flex-col items-start justify-start gap-5">
							<Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
								Phone
							</Typography>
							<Input
								size="lg"
								type="tel"
								required
								placeholder="0123456789"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								name="phone"
								onChange={handleContactUsChange}
							/>
						</div>

						<div className="flex flex-col items-start justify-start gap-5 w-full col-span-2">
							<Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
								Message
							</Typography>
							<Textarea name="message" placeholder="I have a problem with my account" onChange={handleContactUsChange} required />
						</div>
						<Button type="submit" className="mt-6 h-16 flex justify-center items-center gap-2 col-span-2 w-[240px] self-center" fullWidth>
							Send Message
							{loading && (
								<span className="flex justify-center items-center w-fit h-fit animate-spin">
									<LoaderCircle size={20} className="animate-spin" />
								</span>
							)}
						</Button>
					</form>
				)}
				{account.role === "admin" && (
					<>
						<Card>
							<CardHeader variant="gradient" color="gray" className="mb-8 p-6">
								<Typography variant="h6" color="white">
									Contact Us Messages
								</Typography>
							</CardHeader>
							<CardBody className="overflow-x-scroll px-0 pt-0 pb-2 h-[500px]">
								{adminMessages.length === 0 || loading ? (
									<div className="flex justify-center items-center h-full">
										<LoaderCircle size={40} className="animate-spin" />
									</div>
								) : (
									<table className="w-full min-w-[640px] table-auto">
										<thead>
											<tr>
												{["name", "email", "phone", "message", "date", ""].map((el) => (
													<th
														key={el}
														className="border-b border-blue-gray-50 py-3 px-5 text-left"
													>
														<Typography
															variant="small"
															className="text-[11px] font-bold uppercase text-blue-gray-400"
														>
															{el}
														</Typography>
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{adminMessages.map(
												({ _id, firstName, lastName , email, phone, createdAt, message }, key) => {
													const className = `py-3 px-5 ${key === adminMessages.length - 1
														? ""
														: "border-b border-blue-gray-50"
														}`;

													return (
														<tr key={_id}>
															<td className={className}>
																<div className="flex items-center gap-4">
																	<div>
																		<Typography
																			variant="small"
																			color="blue-gray"
																			className="font-semibold"
																		>
																			{firstName} {lastName}
																		</Typography>
																	</div>
																</div>
															</td>
															<td className={className}>
																<Typography className="text-xs font-semibold text-blue-gray-600">
																	{email}
																</Typography>
															</td>
															<td className={className}>
																<Chip
																	variant="gradient"
																	color={"blue-gray"}
																	value={phone}
																	className="py-0.5 px-2 text-[11px] font-medium w-fit"
																/>
															</td>
															<td className={className}>
																<Typography title={message} className="text-xs font-semibold text-blue-gray-600">
																	{message.slice(0, 20)}
																</Typography>
															</td>
															<td className={className}>
																<Typography className="text-xs font-semibold text-blue-gray-600">
																	{new Date(createdAt).toLocaleString()}
																</Typography>
															</td>
														</tr>
													);
												}
											)}
										</tbody>
									</table>
								)}
							</CardBody>
						</Card>
						{pagesNumber > 1 && <div className="w-full flex justify-center items-center">
							<PageNumbers page={page} pagesNumber={pagesNumber} next={next} prev={prev} />
						</div>}
					</>
				)}
			</section>
		</div>
	);
}