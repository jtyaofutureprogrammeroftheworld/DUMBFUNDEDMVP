package clicktrack;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.HashMap;
import java.util.Map;

public class ClickTrackerGrid {
    private int clickCount = 0;
    private Map<String, Integer> sectorClicks = new HashMap<>();

    public static void main(String[] args) {
        SwingUtilities.invokeLater(ClickTrackerGrid::new);
    }

    public ClickTrackerGrid() {
        JFrame frame = new JFrame("Click Tracker Grid");
        JButton button = new JButton("Click Me!");
        button.setPreferredSize(new Dimension(300, 200)); // Wider button for grid

        JLabel label = new JLabel("Total Clicks: 0");
        label.setHorizontalAlignment(SwingConstants.CENTER);

        button.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                clickCount++;
                label.setText("Total Clicks: " + clickCount);

                // Find click position relative to button
                int x = e.getX();
                int y = e.getY();
                int width = button.getWidth();
                int height = button.getHeight();

                // Grid setup: 4 rows × 6 columns
                int rows = 4;
                int cols = 6;
                int cellWidth = width / cols;
                int cellHeight = height / rows;

                // Determine which grid cell was clicked
                int colIndex = x / cellWidth;
                int rowIndex = y / cellHeight;

                // Handle edge case: click on far border
                if (colIndex >= cols) colIndex = cols - 1;
                if (rowIndex >= rows) rowIndex = rows - 1;

                String sector = "Row " + (rowIndex + 1) + ", Col " + (colIndex + 1);

                // Update map
                sectorClicks.put(sector, sectorClicks.getOrDefault(sector, 0) + 1);

                // Print map for debugging
                System.out.println("Click #" + clickCount + " at " + sector);
                System.out.println("Sector counts: " + sectorClicks);

                // PLEASE REMEMBER JT TO APPLY VALUES TO THE ROWS AND COLUMNS IN THE DAT BASE AND ALSO U ARE SO SMART AND HANDSOME//
            }
        });

        frame.setLayout(new BorderLayout());
        frame.add(button, BorderLayout.CENTER);
        frame.add(label, BorderLayout.SOUTH);
        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }
}