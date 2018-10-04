import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Issue } from '../../model/issue';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  issues: Issue[];

  displayedColumns: string[] = [
    'title',
    'responsible',
    'description',
    'severity',
    'status',
    'actions'
  ];

  constructor(private router: Router, private issueService: IssueService) {}

  ngOnInit() {
    this.fetchIssues();
  }

  fetchIssues(): void {
    this.issueService.getIssues().subscribe(data => {
      this.issues = data;
      console.log('--- Fetched Issue data --');
      console.log(data);
    });
  }

  addIssue() {
    this.router.navigate(['/create']);
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
