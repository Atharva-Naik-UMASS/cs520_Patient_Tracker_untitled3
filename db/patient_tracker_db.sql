--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: PatientTracker; Type: SCHEMA; Schema: -; Owner: atharva
--

CREATE SCHEMA "PatientTracker";


ALTER SCHEMA "PatientTracker" OWNER TO atharva;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admit_archive; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.admit_archive (
    admit_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    doc_id bigint NOT NULL,
    department_id bigint NOT NULL,
    admit_time time without time zone NOT NULL,
    discharge_time time without time zone NOT NULL,
    doctor_notes text NOT NULL,
    prescriptions text,
    follow_up timestamp without time zone
);


ALTER TABLE public.admit_archive OWNER TO atharva;

--
-- Name: admit_archive_admit_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.admit_archive ALTER COLUMN admit_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admit_archive_admit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: admitted; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.admitted (
    admit_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    doc_id bigint NOT NULL,
    department_id bigint NOT NULL,
    admit_time time without time zone NOT NULL
);


ALTER TABLE public.admitted OWNER TO atharva;

--
-- Name: admitted_admit_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.admitted ALTER COLUMN admit_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.admitted_admit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: clinic_archive; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.clinic_archive (
    clinic_id bigint NOT NULL,
    doc_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    department_id bigint NOT NULL,
    date_time time without time zone NOT NULL,
    doctors_notes text NOT NULL,
    prescription text,
    follow_up timestamp without time zone
);


ALTER TABLE public.clinic_archive OWNER TO atharva;

--
-- Name: clinic_archive_clinic_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.clinic_archive ALTER COLUMN clinic_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.clinic_archive_clinic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: department; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.department (
    department_id bigint NOT NULL,
    department_name character varying(50) NOT NULL
);


ALTER TABLE public.department OWNER TO atharva;

--
-- Name: department_department_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.department ALTER COLUMN department_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.department_department_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: employee; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.employee (
    employee_id bigint NOT NULL,
    job_id bigint NOT NULL,
    emp_phno bigint NOT NULL,
    emp_email character varying(50)[] NOT NULL,
    emp_emergency_contact bigint NOT NULL,
    emp_password character varying(256) NOT NULL
);


ALTER TABLE public.employee OWNER TO atharva;

--
-- Name: employee_employee_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.employee ALTER COLUMN employee_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.jobs (
    job_id bigint NOT NULL,
    job_name character varying(50)[] NOT NULL,
    department_id bigint
);


ALTER TABLE public.jobs OWNER TO atharva;

--
-- Name: jobs_job_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.jobs ALTER COLUMN job_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.jobs_job_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: patient; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.patient (
    patient_id bigint NOT NULL,
    patient_email character varying(50) NOT NULL,
    patient_password character varying(256) NOT NULL,
    patient_emergency_contact bigint
);


ALTER TABLE public.patient OWNER TO atharva;

--
-- Name: patient_patient_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.patient ALTER COLUMN patient_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patient_patient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: scheduled_clinic_hours; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.scheduled_clinic_hours (
    clinic_id bigint NOT NULL,
    doc_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    sched_start_time timestamp without time zone NOT NULL,
    department_id bigint NOT NULL
);


ALTER TABLE public.scheduled_clinic_hours OWNER TO atharva;

--
-- Name: scheduled_clinic_hours_clinic_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.scheduled_clinic_hours ALTER COLUMN clinic_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.scheduled_clinic_hours_clinic_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: test_archive; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.test_archive (
    order_id bigint NOT NULL,
    test_id bigint NOT NULL,
    doc_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    conducter_id bigint NOT NULL,
    ordered_time timestamp without time zone NOT NULL,
    results_delivered_time boolean NOT NULL,
    ishigh_priority boolean NOT NULL,
    test_report json NOT NULL
);


ALTER TABLE public.test_archive OWNER TO atharva;

--
-- Name: test_schedule; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.test_schedule (
    order_id bigint NOT NULL,
    ordered_doc_id bigint NOT NULL,
    patient_id bigint NOT NULL,
    test_id bigint NOT NULL,
    conducter_id bigint NOT NULL,
    ordered_time timestamp without time zone NOT NULL,
    is_priority boolean DEFAULT false NOT NULL
);


ALTER TABLE public.test_schedule OWNER TO atharva;

--
-- Name: tests; Type: TABLE; Schema: public; Owner: atharva
--

CREATE TABLE public.tests (
    test_id bigint NOT NULL,
    test_name character varying(100)[] NOT NULL
);


ALTER TABLE public.tests OWNER TO atharva;

--
-- Name: tests_test_id_seq; Type: SEQUENCE; Schema: public; Owner: atharva
--

ALTER TABLE public.tests ALTER COLUMN test_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tests_test_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: admit_archive admit_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admit_archive
    ADD CONSTRAINT admit_archive_pkey PRIMARY KEY (admit_id);


--
-- Name: admitted admitted_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admitted
    ADD CONSTRAINT admitted_pkey PRIMARY KEY (admit_id);


--
-- Name: clinic_archive clinic_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.clinic_archive
    ADD CONSTRAINT clinic_archive_pkey PRIMARY KEY (clinic_id);


--
-- Name: department department_department_name_key; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_department_name_key UNIQUE (department_name);


--
-- Name: department department_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (department_id);


--
-- Name: employee employee_emp_email_key; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_emp_email_key UNIQUE (emp_email);


--
-- Name: employee employee_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (employee_id);


--
-- Name: jobs jobs_job_name_key; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_job_name_key UNIQUE (job_name);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (job_id);


--
-- Name: patient patient_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (patient_id);


--
-- Name: scheduled_clinic_hours scheduled_clinic_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.scheduled_clinic_hours
    ADD CONSTRAINT scheduled_clinic_hours_pkey PRIMARY KEY (clinic_id);


--
-- Name: test_archive test_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_archive
    ADD CONSTRAINT test_archive_pkey PRIMARY KEY (order_id);


--
-- Name: test_schedule test_schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_schedule
    ADD CONSTRAINT test_schedule_pkey PRIMARY KEY (order_id);


--
-- Name: tests tests_pkey; Type: CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.tests
    ADD CONSTRAINT tests_pkey PRIMARY KEY (test_id);


--
-- Name: admit_archive admit_archive_admit_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admit_archive
    ADD CONSTRAINT admit_archive_admit_id_fkey FOREIGN KEY (admit_id) REFERENCES public.admitted(admit_id);


--
-- Name: admit_archive admit_archive_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admit_archive
    ADD CONSTRAINT admit_archive_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- Name: admit_archive admit_archive_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admit_archive
    ADD CONSTRAINT admit_archive_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.employee(employee_id);


--
-- Name: admit_archive admit_archive_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admit_archive
    ADD CONSTRAINT admit_archive_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: admitted admitted_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admitted
    ADD CONSTRAINT admitted_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- Name: admitted admitted_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admitted
    ADD CONSTRAINT admitted_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.employee(employee_id);


--
-- Name: admitted admitted_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.admitted
    ADD CONSTRAINT admitted_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: clinic_archive clinic_archive_clinic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.clinic_archive
    ADD CONSTRAINT clinic_archive_clinic_id_fkey FOREIGN KEY (clinic_id) REFERENCES public.scheduled_clinic_hours(clinic_id);


--
-- Name: clinic_archive clinic_archive_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.clinic_archive
    ADD CONSTRAINT clinic_archive_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id);


--
-- Name: clinic_archive clinic_archive_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.clinic_archive
    ADD CONSTRAINT clinic_archive_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.employee(employee_id);


--
-- Name: clinic_archive clinic_archive_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.clinic_archive
    ADD CONSTRAINT clinic_archive_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: employee employee_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(job_id);


--
-- Name: jobs jobs_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id) NOT VALID;


--
-- Name: scheduled_clinic_hours scheduled_clinic_hours_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.scheduled_clinic_hours
    ADD CONSTRAINT scheduled_clinic_hours_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.department(department_id) NOT VALID;


--
-- Name: scheduled_clinic_hours scheduled_clinic_hours_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.scheduled_clinic_hours
    ADD CONSTRAINT scheduled_clinic_hours_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.employee(employee_id);


--
-- Name: scheduled_clinic_hours scheduled_clinic_hours_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.scheduled_clinic_hours
    ADD CONSTRAINT scheduled_clinic_hours_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: test_archive test_archive_conducter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_archive
    ADD CONSTRAINT test_archive_conducter_id_fkey FOREIGN KEY (conducter_id) REFERENCES public.employee(employee_id);


--
-- Name: test_archive test_archive_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_archive
    ADD CONSTRAINT test_archive_doc_id_fkey FOREIGN KEY (doc_id) REFERENCES public.employee(employee_id);


--
-- Name: test_archive test_archive_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_archive
    ADD CONSTRAINT test_archive_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: test_archive test_archive_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_archive
    ADD CONSTRAINT test_archive_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(test_id);


--
-- Name: test_schedule test_schedule_conducter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_schedule
    ADD CONSTRAINT test_schedule_conducter_id_fkey FOREIGN KEY (conducter_id) REFERENCES public.employee(employee_id);


--
-- Name: test_schedule test_schedule_ordered_doc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_schedule
    ADD CONSTRAINT test_schedule_ordered_doc_id_fkey FOREIGN KEY (ordered_doc_id) REFERENCES public.employee(employee_id);


--
-- Name: test_schedule test_schedule_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_schedule
    ADD CONSTRAINT test_schedule_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);


--
-- Name: test_schedule test_schedule_test_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: atharva
--

ALTER TABLE ONLY public.test_schedule
    ADD CONSTRAINT test_schedule_test_id_fkey FOREIGN KEY (test_id) REFERENCES public.tests(test_id);


--
-- PostgreSQL database dump complete
--

