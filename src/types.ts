/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodeSnippet {
  id: string;
  title: string;
  page: string;
  section: string;
  description: string;
  filename: string;
  expectedOutput: string;
  originalCode: string;
  correctedCode: string; // Properly commented and fixed for modern standards
  vsCodeInstructions: string;
  // Execution type determines how the sandbox simulator should run it
  executionType: 'alert' | 'interactive' | 'window' | 'document' | 'form' | 'events';
  initialState?: Record<string, any>;
}
