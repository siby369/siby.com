import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "1",
        title: "B.E. Computer Science and Engineering",
        employmentPeriod: {
          start: "2023",
          end: "2027",
        },
        description: `KIT-Kalaignarkarunanidhi Institute of Technology, Coimbatore.
Current CGPA: 8.1/10.0
- Coursework: DSA, Computer Architecture, Computer Networks, Operating Systems, Database Management Systems, OOPS.`,
        icon: "education",
        skills: ["DSA", "Computer Architecture", "Computer Networks", "Operating Systems", "DBMS", "OOPS"],
      },
    ],
  },
  {
    id: "volunteering",
    companyName: "Volunteering",
    positions: [
      {
        id: "1",
        title: "Member of Karate Club",
        employmentPeriod: {
          start: "2023",
        },
        description: "Actively involved in event coordination and Karate instruction.",
        icon: "volunteer",
      },
      {
        id: "2",
        title: "Teaching Competitive Programming",
        employmentPeriod: {
          start: "2024",
        },
        description: "Teaching fundamentals and coding platforms to junior students, delivering problem-solving sessions and guided practice.",
        icon: "volunteer",
      },
    ],
  },
]
