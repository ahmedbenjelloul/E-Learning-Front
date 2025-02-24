import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/Quiz';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes: Quiz[] = [];
  newQuiz: Quiz = { titre: '', score: 0, scoreMinimum: 0 };

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getAllQuizzes();
  }

  getAllQuizzes(): void {
    this.quizService.getAllQuizzes().subscribe(data => (this.quizzes = data));
  }

  createQuiz(): void {
    this.quizService.createQuiz(this.newQuiz).subscribe(() => {
      this.getAllQuizzes();
      this.newQuiz = { titre: '', score: 0, scoreMinimum: 0 };
    });
  }

  deleteQuiz(id: number): void {
    this.quizService.deleteQuiz(id).subscribe(() => this.getAllQuizzes());
  }
}
