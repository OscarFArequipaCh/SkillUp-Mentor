import express from "express";
import { CourseService } from "../service/courseService.js";

const router = express.Router();
const courseService = new CourseService();
// GET /api/courses
router.get("/", async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    res.json(course);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
// POST /api/courses
router.post("/", async (req, res) => {
    try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// PUT /api/courses/:id
router.put("/:id", async (req, res) => {
    try {
    const updated = await courseService.updateCourse(req.params.id, req.body);
    res.json(updated);
  }
    catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE /api/courses/:id
router.delete("/:id", async (req, res) => {
    try {
    await courseService.deleteCourse(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
export default router;
